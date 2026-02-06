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
  
  // Separate refs for mobile and desktop
  const gameRefMobile = useRef(null);
  const gameRefDesktop = useRef(null);
  const phaserGameMobile = useRef(null);
  const phaserGameDesktop = useRef(null);
  
  const robotStateRef = useRef({
    x: 0,
    y: 0,
    direction: 0,
    starsCollected: 0,
  });
  const gameObjectsRef = useRef(null);

  const challenge = challengeData[id] || challengeData['1'];

  // Mobile Phaser instance
  useEffect(() => {
    if (!gameRefMobile.current || phaserGameMobile.current) return;

    const config = {
      type: Phaser.AUTO,
      width: 600,
      height: 600,
      parent: gameRefMobile.current,
      backgroundColor: '#f0f9ff',
      scene: {
        create: function() { createScene.call(this, id); },
      },
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    };

    phaserGameMobile.current = new Phaser.Game(config);

    return () => {
      if (phaserGameMobile.current) {
        phaserGameMobile.current.destroy(true);
        phaserGameMobile.current = null;
      }
    };
  }, [id]);

  // Desktop Phaser instance
  useEffect(() => {
    if (!gameRefDesktop.current || phaserGameDesktop.current) return;

    const config = {
      type: Phaser.AUTO,
      width: 600,
      height: 600,
      parent: gameRefDesktop.current,
      backgroundColor: '#f0f9ff',
      scene: {
        create: function() { createScene.call(this, id); },
      },
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    };

    phaserGameDesktop.current = new Phaser.Game(config);

    return () => {
      if (phaserGameDesktop.current) {
        phaserGameDesktop.current.destroy(true);
        phaserGameDesktop.current = null;
      }
    };
  }, [id]);

  function createScene(challengeId) {
    const scene = this;
    const gridSize = 60;
    const cols = 10;
    const rows = 10;

    // Store scene reference immediately
    gameObjectsRef.current = scene;

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

    if (challengeId === '2') {
      // Challenge 2: Turn Around - L-shaped path
      const target = scene.add.star(270, 270, 5, 15, 25, 0xfec601);
      target.setStrokeStyle(2, 0xffffff);
      scene.target = target;
      scene.targetX = 4;
      scene.targetY = 4;
      scene.challengeType = 'reach';
      
      // Add visual path hints (optional - light guide)
      const pathGraphics = scene.add.graphics();
      pathGraphics.lineStyle(3, 0x3da5d9, 0.15);
      // Horizontal line right
      pathGraphics.lineBetween(30, 30, 270, 30);
      // Vertical line down
      pathGraphics.lineBetween(270, 30, 270, 270);
    } else if (challengeId === '4') {
      // Challenge 4: Loops Basics - straight line with loops
      const target = scene.add.star(450, 30, 5, 15, 25, 0xfec601);
      target.setStrokeStyle(2, 0xffffff);
      scene.target = target;
      scene.targetX = 7;
      scene.targetY = 0;
      scene.challengeType = 'reach';
      
      // Add visual path hint
      const pathGraphics = scene.add.graphics();
      pathGraphics.lineStyle(3, 0x3da5d9, 0.15);
      pathGraphics.lineBetween(30, 30, 450, 30);
    } else if (challengeId === '5') {
      // Challenge 5: Obstacle Course - navigate around walls
      const target = scene.add.star(510, 510, 5, 15, 25, 0xfec601);
      target.setStrokeStyle(2, 0xffffff);
      scene.target = target;
      scene.targetX = 8;
      scene.targetY = 8;
      scene.challengeType = 'reach';
      
      // Create walls - vertical wall in the middle
      const wallPositions = [
        { x: 4, y: 1 },
        { x: 4, y: 2 },
        { x: 4, y: 3 },
        { x: 4, y: 4 },
        { x: 4, y: 5 },
        { x: 4, y: 6 },
        { x: 4, y: 7 },
      ];
      
      const walls = wallPositions.map(pos => {
        const wall = scene.add.rectangle(
          pos.x * gridSize + 30,
          pos.y * gridSize + 30,
          50, 50, 0x8b4513
        );
        wall.setStrokeStyle(2, 0x654321);
        wall.gridX = pos.x;
        wall.gridY = pos.y;
        return wall;
      });
      
      scene.walls = walls;
      scene.wallPositions = wallPositions;
    } else if (challengeId === '6') {
      // Challenge 6: Conditional Thinking - use if/else to navigate
      const target = scene.add.star(510, 30, 5, 15, 25, 0xfec601);
      target.setStrokeStyle(2, 0xffffff);
      scene.target = target;
      scene.targetX = 8;
      scene.targetY = 0;
      scene.challengeType = 'reach';
      
      // Create a corridor with random walls
      const wallPositions = [
        { x: 2, y: 0 },
        { x: 4, y: 0 },
        { x: 6, y: 0 },
      ];
      
      const walls = wallPositions.map(pos => {
        const wall = scene.add.rectangle(
          pos.x * gridSize + 30,
          pos.y * gridSize + 30,
          50, 50, 0x8b4513
        );
        wall.setStrokeStyle(2, 0x654321);
        wall.gridX = pos.x;
        wall.gridY = pos.y;
        return wall;
      });
      
      scene.walls = walls;
      scene.wallPositions = wallPositions;
    } else if (challengeId === '3') {
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
      // Challenge 1: Simple straight line - top right corner
      const target = scene.add.star(570, 30, 5, 15, 25, 0xfec601);
      target.setStrokeStyle(2, 0xffffff);
      scene.target = target;
      scene.targetX = 9;
      scene.targetY = 0;
      scene.challengeType = 'reach';
    }
  }

  const handleRunCode = async () => {
    if (!generatedCode.trim()) {
      alert('Please add some blocks first!');
      return;
    }

    setIsRunning(true);

    // Get both scenes - we need to update both mobile and desktop
    const sceneMobile = phaserGameMobile.current?.scene?.scenes[0];
    const sceneDesktop = phaserGameDesktop.current?.scene?.scenes[0];
    const activeScene = sceneMobile || sceneDesktop;
    
    if (!activeScene) {
      console.error('No scene available');
      setIsRunning(false);
      return;
    }

    robotStateRef.current = { x: 0, y: 0, direction: 0, starsCollected: 0 };
    
    // Reset stars in both scenes if they exist
    [sceneMobile, sceneDesktop].forEach(scene => {
      if (scene?.stars) {
        scene.stars.forEach(star => {
          star.collected = false;
          star.setVisible(true);
          star.setAlpha(1);
        });
      }
      if (scene) {
        updateRobotVisual(scene);
      }
    });

    const robot = {
      moveForward: async () => {
        const dir = robotStateRef.current.direction;
        const currentX = robotStateRef.current.x;
        const currentY = robotStateRef.current.y;
        
        // Calculate next position
        let nextX = currentX;
        let nextY = currentY;
        
        // Direction: 0=right, 90=down, 180=left, 270=up
        if (dir === 0) nextX++;      // Right
        else if (dir === 90) nextY++; // Down
        else if (dir === 180) nextX--; // Left
        else if (dir === 270) nextY--; // Up

        // Keep within grid bounds
        nextX = Math.max(0, Math.min(9, nextX));
        nextY = Math.max(0, Math.min(9, nextY));
        
        // Check for wall collision
        const hitWall = activeScene.wallPositions?.some(wall => 
          wall.x === nextX && wall.y === nextY
        );
        
        if (hitWall) {
          console.log('Cannot move - wall detected at:', nextX, nextY);
          // Robot bumps into wall but doesn't move
          await new Promise(resolve => setTimeout(resolve, 200));
          return;
        }
        
        // Move to next position
        robotStateRef.current.x = nextX;
        robotStateRef.current.y = nextY;

        console.log('Robot moved to:', robotStateRef.current.x, robotStateRef.current.y, 'direction:', dir);
        
        // Animate both scenes
        const promises = [];
        if (sceneMobile) promises.push(animateRobot(sceneMobile));
        if (sceneDesktop) promises.push(animateRobot(sceneDesktop));
        await Promise.all(promises);
        await new Promise(resolve => setTimeout(resolve, 350)); // Longer delay to ensure animation completes
      },
      turnLeft: async () => {
        robotStateRef.current.direction = (robotStateRef.current.direction + 270) % 360;
        console.log('Turned left, now facing:', robotStateRef.current.direction);
        
        // Animate both scenes
        const promises = [];
        if (sceneMobile) promises.push(animateRobot(sceneMobile));
        if (sceneDesktop) promises.push(animateRobot(sceneDesktop));
        await Promise.all(promises);
        await new Promise(resolve => setTimeout(resolve, 250)); // Delay for turn
      },
      turnRight: async () => {
        robotStateRef.current.direction = (robotStateRef.current.direction + 90) % 360;
        console.log('Turned right, now facing:', robotStateRef.current.direction);
        
        // Animate both scenes
        const promises = [];
        if (sceneMobile) promises.push(animateRobot(sceneMobile));
        if (sceneDesktop) promises.push(animateRobot(sceneDesktop));
        await Promise.all(promises);
        await new Promise(resolve => setTimeout(resolve, 250)); // Delay for turn
      },
      collect: async () => {
        [sceneMobile, sceneDesktop].forEach(scene => {
          if (scene?.stars) {
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
        });
        await new Promise(resolve => setTimeout(resolve, 300));
      },
      checkWall: async () => {
        const dir = robotStateRef.current.direction;
        const currentX = robotStateRef.current.x;
        const currentY = robotStateRef.current.y;
        
        // Calculate position ahead
        let aheadX = currentX;
        let aheadY = currentY;
        
        if (dir === 0) aheadX++;      // Right
        else if (dir === 90) aheadY++; // Down
        else if (dir === 180) aheadX--; // Left
        else if (dir === 270) aheadY--; // Up
        
        // Check if ahead position is out of bounds
        if (aheadX < 0 || aheadX > 9 || aheadY < 0 || aheadY > 9) {
          return true; // Wall (edge of grid)
        }
        
        // Check if there's a wall at that position
        const hasWall = activeScene.wallPositions?.some(wall => 
          wall.x === aheadX && wall.y === aheadY
        );
        
        return hasWall || false;
      },
    };

    try {
      const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
      const executeCode = new AsyncFunction('robot', generatedCode);
      await executeCode(robot);

      setTimeout(() => {
        console.log('=== CHECKING WIN CONDITION ===');
        console.log('Robot final position:', robotStateRef.current.x, robotStateRef.current.y);
        console.log('Active scene targetX:', activeScene.targetX);
        console.log('Active scene targetY:', activeScene.targetY);
        console.log('Challenge type:', activeScene.challengeType);
        
        if (activeScene.challengeType === 'collect') {
          const totalStars = activeScene.stars.length;
          const collected = robotStateRef.current.starsCollected;
          
          if (collected === totalStars) {
            alert(`🎉 Amazing! You collected all ${totalStars} stars!`);
          } else if (collected > 0) {
            alert(`Good progress! You collected ${collected} out of ${totalStars} stars. Keep going - you're almost there!`);
          } else {
            alert(`You haven't collected any stars yet. Remember to move to a star's location and use the "Collect Star ⭐" block!`);
          }
        } else {
          // Use explicit undefined check for targetY since 0 is a valid value
          const targetX = activeScene.targetX !== undefined ? activeScene.targetX : 9;
          const targetY = activeScene.targetY !== undefined ? activeScene.targetY : 9;
          console.log('Calculated target:', targetX, targetY);
          
          if (robotStateRef.current.x === targetX && robotStateRef.current.y === targetY) {
            alert('🎉 Congratulations! You completed the challenge!');
          } else {
            alert(`Try again! The robot needs to reach the yellow star. Robot is at (${robotStateRef.current.x}, ${robotStateRef.current.y}), target is at (${targetX}, ${targetY})`);
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
      if (!scene || !scene.robot) {
        console.error('Scene or robot not available');
        resolve();
        return;
      }

      const gridSize = scene.gridSize;
      const targetX = robotStateRef.current.x * gridSize + 30;
      const targetY = robotStateRef.current.y * gridSize + 30;
      const currentX = scene.robot.x;
      const currentY = scene.robot.y;

      console.log('Animating from:', currentX, currentY, 'to:', targetX, targetY);

      // Only animate the coordinate that changed
      const animateProps = {};
      if (currentX !== targetX) {
        animateProps.x = targetX;
      }
      if (currentY !== targetY) {
        animateProps.y = targetY;
      }

      // If position changed, animate it
      if (Object.keys(animateProps).length > 0) {
        scene.tweens.add({
          targets: [scene.robot, scene.arrow],
          ...animateProps,
          duration: 400, // Increased duration for smoother animation
          ease: 'Linear',
          onComplete: resolve,
        });
      } else {
        // Just turning, no position change
        resolve();
      }

      // Always animate rotation separately
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
    const sceneMobile = phaserGameMobile.current?.scene?.scenes[0];
    const sceneDesktop = phaserGameDesktop.current?.scene?.scenes[0];
    
    robotStateRef.current = { x: 0, y: 0, direction: 0, starsCollected: 0 };
    
    // Reset both scenes
    [sceneMobile, sceneDesktop].forEach(scene => {
      if (scene) {
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
    });
    
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-yellow-50">
      {/* Header */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/challenges" className="flex items-center gap-2 text-[#2364aa] hover:text-[#3da5d9] transition-colors">
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

        {/* Robot Simulator - Sticky on Mobile */}
        <div className="sticky top-16 z-30 mb-6 lg:hidden">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">🤖 Robot Simulator</h2>
            <div 
              ref={gameRefMobile}
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
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-6">
          {/* Left Column - Instructions & Code Editor */}
          <div className="space-y-6">
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

              <div className="bg-gray-50 rounded-xl p-4 min-h-[500px] relative overflow-hidden">
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

          {/* Right Column - Robot Simulator for Desktop */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">🤖 Robot Simulator</h2>
            <div 
              ref={gameRefDesktop}
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
        </div>

        {/* Mobile Layout - Instructions & Code Only */}
        <div className="lg:hidden space-y-6">
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

            <div className="bg-gray-50 rounded-xl p-4 min-h-[500px] relative overflow-hidden">
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
  );
};

const challengeData = {
  '1': {
    title: 'First Steps',
    description: 'Make your robot move forward and reach the yellow target!',
    difficulty: 'Beginner',
    difficultyColor: 'bg-[#73bfb8]/20 text-[#73bfb8]',
    instructions: [
      'Welcome! Your robot (blue circle) starts in the top-left corner',
      'The yellow star is your target - it\'s 9 spaces to the right',
      'Drag "Move Forward" blocks from the left into the workspace',
      'Stack 9 "Move Forward" blocks on top of each other',
      'Click the "Run Code" button to make your robot move!'
    ],
  },
  '2': {
    title: 'Turn Around',
    description: 'Learn to turn your robot left and right to navigate corners.',
    difficulty: 'Beginner',
    difficultyColor: 'bg-[#73bfb8]/20 text-[#73bfb8]',
    instructions: [
      'The target is in a different location - follow the path to reach it!',
      'Your robot starts facing right. Use "Move Forward" 4 times to move across',
      'Use "Turn Right" to face downward',
      'Use "Move Forward" 4 more times to reach the yellow star',
      'Remember: the robot always moves in the direction it\'s facing!'
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
  '4': {
    title: 'Loops Basics',
    description: 'Use loops to repeat actions efficiently.',
    difficulty: 'Easy',
    difficultyColor: 'bg-[#3da5d9]/20 text-[#3da5d9]',
    instructions: [
      'The target is 7 spaces to the right - that\'s a lot of "Move Forward" blocks!',
      'Instead of dragging 7 separate blocks, use a LOOP to repeat the action',
      'Drag a "Repeat" loop block and set it to repeat 7 times',
      'Put a "Move Forward" block inside the loop',
      'This is much more efficient than using 7 separate blocks!'
    ],
  },
  '5': {
    title: 'Obstacle Course',
    description: 'Navigate around walls using smart pathfinding.',
    difficulty: 'Medium',
    difficultyColor: 'bg-[#fec601]/20 text-[#fec601]',
    instructions: [
      'There\'s a wall blocking the direct path to the target!',
      'The brown wall blocks your robot - you can\'t move through it',
      'You need to go AROUND the wall to reach the star',
      'Plan your path: move right, then down around the wall, then continue to the target',
      'Use loops and turns to navigate efficiently around the obstacle!'
    ],
  },
  '6': {
    title: 'Conditional Thinking',
    description: 'Make decisions with if/else statements.',
    difficulty: 'Hard',
    difficultyColor: 'bg-[#ea7317]/20 text-[#ea7317]',
    instructions: [
      'The robot needs to navigate a corridor with walls in random places!',
      'Use the "if wall ahead" block to check if there\'s a wall in front',
      'If there IS a wall: turn right to go around it',
      'If there is NO wall: move forward',
      'Put this if/else inside a loop to keep checking and moving until you reach the target!'
    ],
  },
};

export default ChallengePage;