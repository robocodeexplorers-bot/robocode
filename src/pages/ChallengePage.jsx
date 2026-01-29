import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, RotateCcw, Code as CodeIcon, Blocks, ChevronDown, ChevronUp } from 'lucide-react';
import Phaser from 'phaser';
import BlocklyEditor from '../components/BlocklyEditor';

const ChallengePage = () => {
  const { id } = useParams();
  const [mode, setMode] = useState('blocks');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [instructionsOpen, setInstructionsOpen] = useState(false);
  const gameRef = useRef(null);
  const phaserGameRef = useRef(null);
  const robotStateRef = useRef({
    x: 0,
    y: 0,
    direction: 0,
    starsCollected: 0,
  });
  const gameObjectsRef = useRef(null);

  const challenge = challengeData[id] || challengeData['1'];

  useEffect(() => {
    if (!gameRef.current || phaserGameRef.current) return;

    const config = {
      type: Phaser.AUTO,
      width: 600,
      height: 600,
      parent: gameRef.current,
      backgroundColor: '#f0f9ff',
      scene: {
        create: function() { createScene.call(this, id); },
      },
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    };

    phaserGameRef.current = new Phaser.Game(config);

    return () => {
      if (phaserGameRef.current) {
        phaserGameRef.current.destroy(true);
        phaserGameRef.current = null;
      }
    };
  }, [id]);

  function createScene(challengeId) {
    const scene = this;
    const gridSize = 60;
    const cols = 10;
    const rows = 10;

    const graphics = scene.add.graphics();
    graphics.lineStyle(1, 0xcccccc, 0.5);
    
    for (let i = 0; i <= cols; i++) {
      graphics.lineBetween(i * gridSize, 0, i * gridSize, rows * gridSize);
    }
    for (let i = 0; i <= rows; i++) {
      graphics.lineBetween(0, i * gridSize, cols * gridSize, i * gridSize);
    }

    const robot = scene.add.circle(30, 30, 20, 0x2364aa);
    robot.setStrokeStyle(3, 0xffffff);

    const arrow = scene.add.triangle(45, 30, 0, -8, 0, 8, 12, 0, 0xffffff);

    scene.robot = robot;
    scene.arrow = arrow;
    scene.gridSize = gridSize;

    if (challengeId === '3') {
      const starPositions = [
        { x: 3, y: 2 },
        { x: 7, y: 5 },
        { x: 5, y: 8 }
      ];

      const stars = starPositions.map(pos => {
        const star = scene.add.star(
          pos.x * gridSize + 30,
          pos.y * gridSize + 30,
          5, 15, 25, 0xfec601
        );
        star.setStrokeStyle(2, 0xffffff);
        star.gridX = pos.x;
        star.gridY = pos.y;
        star.collected = false;
        return star;
      });

      scene.stars = stars;
      scene.challengeType = 'collect';
    } else {
      const target = scene.add.star(570, 570, 5, 15, 25, 0xfec601);
      target.setStrokeStyle(2, 0xffffff);
      scene.target = target;
      scene.challengeType = 'reach';
    }

    gameObjectsRef.current = scene;
  }

  const handleRunCode = async () => {
    if (!generatedCode.trim()) {
      alert('Please add some blocks first!');
      return;
    }

    setIsRunning(true);

    const scene = phaserGameRef.current?.scene?.scenes[0];
    if (!scene) return;

    robotStateRef.current = { x: 0, y: 0, direction: 0, starsCollected: 0 };
    
    if (scene.stars) {
      scene.stars.forEach(star => {
        star.collected = false;
        star.setVisible(true);
        star.setAlpha(1);
      });
    }
    
    updateRobotVisual(scene);

    const robot = {
      moveForward: async () => {
        const dir = robotStateRef.current.direction;
        if (dir === 0) robotStateRef.current.x++;
        else if (dir === 90) robotStateRef.current.y++;
        else if (dir === 180) robotStateRef.current.x--;
        else if (dir === 270) robotStateRef.current.y--;

        robotStateRef.current.x = Math.max(0, Math.min(9, robotStateRef.current.x));
        robotStateRef.current.y = Math.max(0, Math.min(9, robotStateRef.current.y));

        await animateRobot(scene);
      },
      turnLeft: async () => {
        robotStateRef.current.direction = (robotStateRef.current.direction + 270) % 360;
        await animateRobot(scene);
      },
      turnRight: async () => {
        robotStateRef.current.direction = (robotStateRef.current.direction + 90) % 360;
        await animateRobot(scene);
      },
      collect: async () => {
        if (scene.stars) {
          const robotX = robotStateRef.current.x;
          const robotY = robotStateRef.current.y;
          
          scene.stars.forEach(star => {
            if (!star.collected && star.gridX === robotX && star.gridY === robotY) {
              star.collected = true;
              robotStateRef.current.starsCollected++;
              
              scene.tweens.add({
                targets: star,
                alpha: 0,
                scale: 2,
                duration: 300,
                ease: 'Power2',
                onComplete: () => {
                  star.setVisible(false);
                }
              });
            }
          });
        }
        await new Promise(resolve => setTimeout(resolve, 300));
      },
    };

    try {
      const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
      const executeCode = new AsyncFunction('robot', generatedCode);
      await executeCode(robot);

      setTimeout(() => {
        if (scene.challengeType === 'collect') {
          const totalStars = scene.stars.length;
          if (robotStateRef.current.starsCollected === totalStars) {
            alert(`🎉 Amazing! You collected all ${totalStars} stars!`);
          } else {
            alert(`You collected ${robotStateRef.current.starsCollected} out of ${totalStars} stars. Try again!`);
          }
        } else {
          if (robotStateRef.current.x === 9 && robotStateRef.current.y === 9) {
            alert('🎉 Congratulations! You completed the challenge!');
          } else {
            alert('Try again! The robot needs to reach the yellow star.');
          }
        }
      }, 500);
    } catch (error) {
      console.error('Error executing code:', error);
      alert('Oops! There was an error running your code.');
    }

    setIsRunning(false);
  };

  const animateRobot = (scene) => {
    return new Promise((resolve) => {
      const gridSize = scene.gridSize;
      const targetX = robotStateRef.current.x * gridSize + 30;
      const targetY = robotStateRef.current.y * gridSize + 30;

      scene.tweens.add({
        targets: [scene.robot, scene.arrow],
        x: targetX,
        y: targetY,
        duration: 300,
        ease: 'Power2',
        onComplete: resolve,
      });

      scene.tweens.add({
        targets: scene.arrow,
        angle: robotStateRef.current.direction,
        duration: 200,
        ease: 'Power2',
      });
    });
  };

  const updateRobotVisual = (scene) => {
    const gridSize = scene.gridSize;
    const x = robotStateRef.current.x * gridSize + 30;
    const y = robotStateRef.current.y * gridSize + 30;
    
    scene.robot.setPosition(x, y);
    scene.arrow.setPosition(x + 15, y);
    scene.arrow.setAngle(robotStateRef.current.direction);
  };

  const handleReset = () => {
    const scene = phaserGameRef.current?.scene?.scenes[0];
    if (scene) {
      robotStateRef.current = { x: 0, y: 0, direction: 0, starsCollected: 0 };
      
      if (scene.stars) {
        scene.stars.forEach(star => {
          star.collected = false;
          star.setVisible(true);
          star.setAlpha(1);
          star.setScale(1);
        });
      }
      
      updateRobotVisual(scene);
    }
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-yellow-50">
      {/* Header */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-[#2364aa] hover:text-[#3da5d9] transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Back to Challenges</span>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#2364aa] to-[#3da5d9] rounded-lg flex items-center justify-center">
                <CodeIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[#2364aa]">RoboCode</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Challenge Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-semibold text-gray-500">Challenge {id}</span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${challenge.difficultyColor}`}>
              {challenge.difficulty}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">{challenge.title}</h1>
          <p className="text-lg text-gray-600">{challenge.description}</p>
        </div>

        {/* Mobile-First Layout / Desktop Grid */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6">
          {/* Robot Simulator - First on Mobile, Right on Desktop */}
          <div className="lg:order-2 bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">🤖 Robot Simulator</h2>
            <div 
              ref={gameRef} 
              className="bg-blue-50 rounded-xl overflow-hidden border-4 border-gray-200"
            />
            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#2364aa]"></div>
                <span>Robot</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#fec601]"></div>
                <span>{id === '3' ? 'Stars' : 'Target'}</span>
              </div>
            </div>
          </div>

          {/* Left Column - Instructions & Code Editor */}
          <div className="lg:order-1 space-y-6">
            {/* Collapsible Instructions Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <button
                onClick={() => setInstructionsOpen(!instructionsOpen)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  📋 Instructions
                </h2>
                {instructionsOpen ? (
                  <ChevronUp className="w-6 h-6 text-gray-400" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                )}
              </button>
              
              {instructionsOpen && (
                <div className="px-6 pb-6 space-y-3 border-t border-gray-100">
                  {challenge.instructions.map((instruction, index) => (
                    <div key={index} className="flex gap-3 pt-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-[#2364aa] text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <p className="text-gray-700">{instruction}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Code Editor Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">💻 Your Code</h2>
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setMode('blocks')}
                    className={`px-4 py-2 rounded-md font-semibold text-sm transition-all flex items-center gap-2 ${
                      mode === 'blocks'
                        ? 'bg-white text-[#2364aa] shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Blocks className="w-4 h-4" />
                    Blocks
                  </button>
                  <button
                    onClick={() => setMode('code')}
                    className={`px-4 py-2 rounded-md font-semibold text-sm transition-all flex items-center gap-2 ${
                      mode === 'code'
                        ? 'bg-white text-[#2364aa] shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <CodeIcon className="w-4 h-4" />
                    Code
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 min-h-[400px]">
                {mode === 'blocks' ? (
                  <BlocklyEditor onCodeChange={setGeneratedCode} />
                ) : (
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto min-h-[400px]">
                    {generatedCode || '// Your JavaScript code will appear here\n\n// Start dragging blocks to see code!'}
                  </pre>
                )}
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="flex-1 bg-[#2364aa] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#1a4d7f] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Play className="w-5 h-5" />
                  {isRunning ? 'Running...' : 'Run Code'}
                </button>
                <button
                  onClick={handleReset}
                  disabled={isRunning}
                  className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <RotateCcw className="w-5 h-5" />
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const challengeData = {
  '1': {
    title: 'First Steps',
    description: 'Make your robot move forward and reach the yellow target!',
    difficulty: 'Beginner',
    difficultyColor: 'bg-[#73bfb8]/20 text-[#73bfb8]',
    instructions: [
      'Look at the grid on the right - your robot (blue circle) needs to reach the target (yellow star)',
      'Use the "Move Forward" block to make your robot move',
      'Click "Run Code" to test your solution',
      'The robot should end up on the target to complete the challenge!'
    ],
  },
  '2': {
    title: 'Turn Around',
    description: 'Learn to turn your robot left and right to navigate corners.',
    difficulty: 'Beginner',
    difficultyColor: 'bg-[#73bfb8]/20 text-[#73bfb8]',
    instructions: [
      'This time the target is not in a straight line',
      'Use "Move Forward" blocks to move',
      'Use "Turn Right" or "Turn Left" blocks to change direction',
      'Reach the target to win!'
    ],
  },
  '3': {
    title: 'Collect Stars',
    description: 'Pick up all the stars scattered around the map!',
    difficulty: 'Easy',
    difficultyColor: 'bg-[#3da5d9]/20 text-[#3da5d9]',
    instructions: [
      'There are 3 stars on the grid that you need to collect',
      'Move your robot to a star\'s location',
      'Use the "Collect Star ⭐" block to pick it up',
      'Collect all 3 stars to complete the challenge!'
    ],
  },
};

export default ChallengePage;