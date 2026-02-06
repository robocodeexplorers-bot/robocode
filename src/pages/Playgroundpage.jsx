import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, RotateCcw, Code as CodeIcon, Blocks, Trash2, Sparkles } from 'lucide-react';
import Phaser from 'phaser';
import * as Blockly from 'blockly/core';
import BlocklyEditor from '../components/BlocklyEditor';

const PlaygroundPage = () => {
  const [mode, setMode] = useState('blocks');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showTrail, setShowTrail] = useState(true);
  const workspaceRef = useRef(null);
  
  const gameRefMobile = useRef(null);
  const gameRefDesktop = useRef(null);
  const phaserGameMobile = useRef(null);
  const phaserGameDesktop = useRef(null);
  
  const robotStateRef = useRef({
    x: 4,
    y: 4,
    direction: 0,
    trail: []
  });

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
        create: function() { createScene.call(this); },
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
  }, []);

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
        create: function() { createScene.call(this); },
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
  }, []);

  function createScene() {
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

    // Robot in center
    const robot = scene.add.circle(270, 270, 20, 0x2364aa);
    robot.setStrokeStyle(3, 0xffffff);

    const arrow = scene.add.triangle(285, 270, 0, -8, 0, 8, 12, 0, 0xffffff);

    scene.robot = robot;
    scene.arrow = arrow;
    scene.gridSize = gridSize;
    scene.trailGraphics = scene.add.graphics();
  }

  const handleRunCode = async () => {
    if (!generatedCode.trim()) {
      alert('Please add some blocks first!');
      return;
    }

    setIsRunning(true);

    const sceneMobile = phaserGameMobile.current?.scene?.scenes[0];
    const sceneDesktop = phaserGameDesktop.current?.scene?.scenes[0];
    const activeScene = sceneMobile || sceneDesktop;
    
    if (!activeScene) {
      console.error('No scene available');
      setIsRunning(false);
      return;
    }

    // Clear previous trail
    robotStateRef.current.trail = [];
    [sceneMobile, sceneDesktop].forEach(scene => {
      if (scene?.trailGraphics) {
        scene.trailGraphics.clear();
      }
    });

    const robot = {
      moveForward: async () => {
        const dir = robotStateRef.current.direction;
        const currentX = robotStateRef.current.x;
        const currentY = robotStateRef.current.y;
        
        let nextX = currentX;
        let nextY = currentY;
        
        if (dir === 0) nextX++;
        else if (dir === 90) nextY++;
        else if (dir === 180) nextX--;
        else if (dir === 270) nextY--;

        nextX = Math.max(0, Math.min(9, nextX));
        nextY = Math.max(0, Math.min(9, nextY));
        
        // Add to trail
        if (showTrail) {
          robotStateRef.current.trail.push({
            fromX: currentX,
            fromY: currentY,
            toX: nextX,
            toY: nextY
          });
        }
        
        robotStateRef.current.x = nextX;
        robotStateRef.current.y = nextY;

        const promises = [];
        if (sceneMobile) promises.push(animateRobot(sceneMobile));
        if (sceneDesktop) promises.push(animateRobot(sceneDesktop));
        await Promise.all(promises);
        await new Promise(resolve => setTimeout(resolve, 200));
      },
      turnLeft: async () => {
        robotStateRef.current.direction = (robotStateRef.current.direction + 270) % 360;
        const promises = [];
        if (sceneMobile) promises.push(animateRobot(sceneMobile));
        if (sceneDesktop) promises.push(animateRobot(sceneDesktop));
        await Promise.all(promises);
        await new Promise(resolve => setTimeout(resolve, 150));
      },
      turnRight: async () => {
        robotStateRef.current.direction = (robotStateRef.current.direction + 90) % 360;
        const promises = [];
        if (sceneMobile) promises.push(animateRobot(sceneMobile));
        if (sceneDesktop) promises.push(animateRobot(sceneDesktop));
        await Promise.all(promises);
        await new Promise(resolve => setTimeout(resolve, 150));
      },
      moveBackward: async () => {
        const dir = robotStateRef.current.direction;
        const currentX = robotStateRef.current.x;
        const currentY = robotStateRef.current.y;
        
        let nextX = currentX;
        let nextY = currentY;
        
        // Move in opposite direction
        if (dir === 0) nextX--;      // Facing right, move left
        else if (dir === 90) nextY--; // Facing down, move up
        else if (dir === 180) nextX++; // Facing left, move right
        else if (dir === 270) nextY++; // Facing up, move down

        nextX = Math.max(0, Math.min(9, nextX));
        nextY = Math.max(0, Math.min(9, nextY));
        
        // Add to trail
        if (showTrail) {
          robotStateRef.current.trail.push({
            fromX: currentX,
            fromY: currentY,
            toX: nextX,
            toY: nextY
          });
        }
        
        robotStateRef.current.x = nextX;
        robotStateRef.current.y = nextY;

        const promises = [];
        if (sceneMobile) promises.push(animateRobot(sceneMobile));
        if (sceneDesktop) promises.push(animateRobot(sceneDesktop));
        await Promise.all(promises);
        await new Promise(resolve => setTimeout(resolve, 200));
      },
      turnAround: async () => {
        robotStateRef.current.direction = (robotStateRef.current.direction + 180) % 360;
        const promises = [];
        if (sceneMobile) promises.push(animateRobot(sceneMobile));
        if (sceneDesktop) promises.push(animateRobot(sceneDesktop));
        await Promise.all(promises);
        await new Promise(resolve => setTimeout(resolve, 200));
      },
    };

    try {
      const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
      const executeCode = new AsyncFunction('robot', generatedCode);
      await executeCode(robot);
    } catch (error) {
      console.error('Error executing code:', error);
      alert('Oops! There was an error running your code.');
    }

    setIsRunning(false);
  };

  const animateRobot = (scene) => {
    return new Promise((resolve) => {
      if (!scene || !scene.robot) {
        resolve();
        return;
      }

      const gridSize = scene.gridSize;
      const targetX = robotStateRef.current.x * gridSize + 30;
      const targetY = robotStateRef.current.y * gridSize + 30;

      // Draw trail
      if (showTrail && robotStateRef.current.trail.length > 0) {
        const lastMove = robotStateRef.current.trail[robotStateRef.current.trail.length - 1];
        scene.trailGraphics.lineStyle(3, 0x3da5d9, 0.6);
        scene.trailGraphics.lineBetween(
          lastMove.fromX * gridSize + 30,
          lastMove.fromY * gridSize + 30,
          lastMove.toX * gridSize + 30,
          lastMove.toY * gridSize + 30
        );
      }

      scene.tweens.add({
        targets: [scene.robot, scene.arrow],
        x: targetX,
        y: targetY,
        duration: 250,
        ease: 'Linear',
        onComplete: resolve,
      });

      scene.tweens.add({
        targets: scene.arrow,
        angle: robotStateRef.current.direction,
        duration: 150,
        ease: 'Power2',
      });
    });
  };

  const handleReset = () => {
    const sceneMobile = phaserGameMobile.current?.scene?.scenes[0];
    const sceneDesktop = phaserGameDesktop.current?.scene?.scenes[0];
    
    robotStateRef.current = { x: 4, y: 4, direction: 0, trail: [] };
    
    [sceneMobile, sceneDesktop].forEach(scene => {
      if (scene) {
        const gridSize = scene.gridSize;
        scene.robot.setPosition(270, 270);
        scene.arrow.setPosition(285, 270);
        scene.arrow.setAngle(0);
        if (scene.trailGraphics) {
          scene.trailGraphics.clear();
        }
      }
    });
    
    setIsRunning(false);
  };

  const loadTemplate = (template) => {
    alert(`Template clicked: ${template}`); // DEBUG
    
    // Small delay to ensure workspace is initialized
    setTimeout(() => {
      const blocklyWorkspace = Blockly.getMainWorkspace();
      
      if (!blocklyWorkspace) {
        console.error('Blockly workspace not initialized');
        alert('Please wait for the workspace to load and try again.');
        return;
      }

      console.log('Loading template:', template);
      console.log('Workspace:', blocklyWorkspace);

      // Clear existing blocks
      blocklyWorkspace.clear();

      let xml;
    
    switch(template) {
      case 'square':
        // Draw a square: Repeat 4 times (Move Forward 3, Turn Right)
        xml = `
          <xml xmlns="https://developers.google.com/blockly/xml">
            <block type="robot_repeat" x="20" y="20">
              <field name="TIMES">4</field>
              <statement name="DO">
                <block type="robot_move_forward">
                  <next>
                    <block type="robot_move_forward">
                      <next>
                        <block type="robot_move_forward">
                          <next>
                            <block type="robot_turn_right"></block>
                          </next>
                        </block>
                      </next>
                    </block>
                  </next>
                </block>
              </statement>
            </block>
          </xml>
        `;
        break;
        
      case 'spiral':
        // Make a spiral: Multiple loops with increasing moves
        xml = `
          <xml xmlns="https://developers.google.com/blockly/xml">
            <block type="robot_move_forward" x="20" y="20">
              <next>
                <block type="robot_turn_right">
                  <next>
                    <block type="robot_move_forward">
                      <next>
                        <block type="robot_move_forward">
                          <next>
                            <block type="robot_turn_right">
                              <next>
                                <block type="robot_move_forward">
                                  <next>
                                    <block type="robot_move_forward">
                                      <next>
                                        <block type="robot_move_forward">
                                          <next>
                                            <block type="robot_turn_right">
                                              <next>
                                                <block type="robot_repeat">
                                                  <field name="TIMES">4</field>
                                                  <statement name="DO">
                                                    <block type="robot_move_forward"></block>
                                                  </statement>
                                                  <next>
                                                    <block type="robot_turn_right">
                                                      <next>
                                                        <block type="robot_repeat">
                                                          <field name="TIMES">5</field>
                                                          <statement name="DO">
                                                            <block type="robot_move_forward"></block>
                                                          </statement>
                                                        </block>
                                                      </next>
                                                    </block>
                                                  </next>
                                                </block>
                                              </next>
                                            </block>
                                          </next>
                                        </block>
                                      </next>
                                    </block>
                                  </next>
                                </block>
                              </next>
                            </block>
                          </next>
                        </block>
                      </next>
                    </block>
                  </next>
                </block>
              </next>
            </block>
          </xml>
        `;
        break;
        
      case 'zigzag':
        // Zigzag pattern: Repeat (Move Forward 2, Turn Right, Move Forward 2, Turn Left)
        xml = `
          <xml xmlns="https://developers.google.com/blockly/xml">
            <block type="robot_repeat" x="20" y="20">
              <field name="TIMES">3</field>
              <statement name="DO">
                <block type="robot_move_forward">
                  <next>
                    <block type="robot_move_forward">
                      <next>
                        <block type="robot_turn_right">
                          <next>
                            <block type="robot_move_forward">
                              <next>
                                <block type="robot_move_forward">
                                  <next>
                                    <block type="robot_turn_left"></block>
                                  </next>
                                </block>
                              </next>
                            </block>
                          </next>
                        </block>
                      </next>
                    </block>
                  </next>
                </block>
              </statement>
            </block>
          </xml>
        `;
        break;
        
      case 'random':
        // Random walk: Repeat 8 times (Move Forward, Turn Right or Left)
        xml = `
          <xml xmlns="https://developers.google.com/blockly/xml">
            <block type="robot_repeat" x="20" y="20">
              <field name="TIMES">8</field>
              <statement name="DO">
                <block type="robot_move_forward">
                  <next>
                    <block type="robot_turn_right">
                      <next>
                        <block type="robot_move_forward">
                          <next>
                            <block type="robot_turn_left">
                              <next>
                                <block type="robot_move_forward">
                                  <next>
                                    <block type="robot_turn_right"></block>
                                  </next>
                                </block>
                              </next>
                            </block>
                          </next>
                        </block>
                      </next>
                    </block>
                  </next>
                </block>
              </statement>
            </block>
          </xml>
        `;
        break;
        
      default:
        return;
    }

    // Load the XML into the workspace
    const dom = Blockly.utils.xml.textToDom(xml);
    Blockly.Xml.domToWorkspace(dom, blocklyWorkspace);
    }, 100); // Close setTimeout
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-yellow-50">
      {/* Header */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-[#2364aa] hover:text-[#3da5d9] transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Back to Home</span>
            </Link>
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-[#fec601]" />
              <span className="text-xl font-bold text-[#2364aa]">Playground</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Free Code Playground
          </h1>
          <p className="text-lg text-gray-600">
            Experiment and create! No goals, no limits - just code and have fun! 🎨
          </p>
        </div>

        {/* Robot Simulator - Sticky on Mobile */}
        <div className="sticky top-16 z-30 mb-6 lg:hidden">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">🤖 Your Canvas</h2>
              <label className="flex items-center gap-2 text-sm">
                <input 
                  type="checkbox" 
                  checked={showTrail}
                  onChange={(e) => setShowTrail(e.target.checked)}
                  className="w-4 h-4"
                />
                <span>Show Trail</span>
              </label>
            </div>
            <div 
              ref={gameRefMobile}
              className="bg-blue-50 rounded-xl overflow-hidden border-4 border-gray-200"
            />
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-6">
          {/* Left Column - Code Editor */}
          <div className="space-y-6">
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

              <div className="bg-gray-50 rounded-xl p-4 min-h-[400px] relative overflow-hidden">
                {mode === 'blocks' ? (
                  <BlocklyEditor onCodeChange={setGeneratedCode} workspaceRef={workspaceRef} />
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
                  className="flex-1 bg-[#2364aa] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#1a4d7f] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
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

          {/* Right Column - Canvas */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">🤖 Your Canvas</h2>
              <label className="flex items-center gap-2 text-sm font-semibold">
                <input 
                  type="checkbox" 
                  checked={showTrail}
                  onChange={(e) => setShowTrail(e.target.checked)}
                  className="w-4 h-4"
                />
                <span>Show Trail</span>
              </label>
            </div>
            <div 
              ref={gameRefDesktop}
              className="bg-blue-50 rounded-xl overflow-hidden border-4 border-gray-200"
            />
            <div className="mt-4 text-center text-sm text-gray-500">
              Create your own patterns and designs!
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-6">
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
                <BlocklyEditor onCodeChange={setGeneratedCode} workspaceRef={workspaceRef} />
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
                className="flex-1 bg-[#2364aa] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#1a4d7f] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
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

export default PlaygroundPage;