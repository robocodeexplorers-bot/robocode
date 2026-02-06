import React, { useEffect, useRef } from 'react';
import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import { javascriptGenerator } from 'blockly/javascript';

const BlocklyEditor = ({ onCodeChange, workspaceRef }) => {
  const blocklyDiv = useRef(null);
  const workspaceRefInternal = useRef(null);

  useEffect(() => {
    if (!blocklyDiv.current) return;

    // Define custom blocks for robot movement
    Blockly.Blocks['robot_move_forward'] = {
      init: function() {
        this.jsonInit({
          "type": "robot_move_forward",
          "message0": "Move Forward",
          "previousStatement": null,
          "nextStatement": null,
          "colour": 230,
          "tooltip": "Move the robot forward one step"
        });
      }
    };

    javascriptGenerator.forBlock['robot_move_forward'] = function(block) {
      return 'await robot.moveForward();\n';
    };

    Blockly.Blocks['robot_turn_left'] = {
      init: function() {
        this.jsonInit({
          "type": "robot_turn_left",
          "message0": "Turn Left",
          "previousStatement": null,
          "nextStatement": null,
          "colour": 230,
          "tooltip": "Turn the robot left"
        });
      }
    };

    javascriptGenerator.forBlock['robot_turn_left'] = function(block) {
      return 'await robot.turnLeft();\n';
    };

    Blockly.Blocks['robot_turn_right'] = {
      init: function() {
        this.jsonInit({
          "type": "robot_turn_right",
          "message0": "Turn Right",
          "previousStatement": null,
          "nextStatement": null,
          "colour": 230,
          "tooltip": "Turn the robot right"
        });
      }
    };

    javascriptGenerator.forBlock['robot_turn_right'] = function(block) {
      return 'await robot.turnRight();\n';
    };

    Blockly.Blocks['robot_collect'] = {
      init: function() {
        this.jsonInit({
          "type": "robot_collect",
          "message0": "Collect Star ⭐",
          "previousStatement": null,
          "nextStatement": null,
          "colour": 45,
          "tooltip": "Collect a star at the robot's current position"
        });
      }
    };

    javascriptGenerator.forBlock['robot_collect'] = function(block) {
      return 'await robot.collect();\n';
    };

    // NEW: Move Backward block
    Blockly.Blocks['robot_move_backward'] = {
      init: function() {
        this.jsonInit({
          "type": "robot_move_backward",
          "message0": "Move Backward",
          "previousStatement": null,
          "nextStatement": null,
          "colour": 230,
          "tooltip": "Move the robot backward one step"
        });
      }
    };

    javascriptGenerator.forBlock['robot_move_backward'] = function(block) {
      return 'await robot.moveBackward();\n';
    };

    // NEW: Turn Around (180 degrees) block
    Blockly.Blocks['robot_turn_around'] = {
      init: function() {
        this.jsonInit({
          "type": "robot_turn_around",
          "message0": "Turn Around 🔄",
          "previousStatement": null,
          "nextStatement": null,
          "colour": 230,
          "tooltip": "Turn the robot 180 degrees"
        });
      }
    };

    javascriptGenerator.forBlock['robot_turn_around'] = function(block) {
      return 'await robot.turnAround();\n';
    };

    // NEW: Wait/Pause block
    Blockly.Blocks['robot_wait'] = {
      init: function() {
        this.jsonInit({
          "type": "robot_wait",
          "message0": "Wait %1 seconds",
          "args0": [
            {
              "type": "field_number",
              "name": "SECONDS",
              "value": 1,
              "min": 0.5,
              "max": 5,
              "precision": 0.5
            }
          ],
          "previousStatement": null,
          "nextStatement": null,
          "colour": 160,
          "tooltip": "Pause for a specified number of seconds"
        });
      }
    };

    javascriptGenerator.forBlock['robot_wait'] = function(block) {
      const seconds = block.getFieldValue('SECONDS');
      return `await new Promise(resolve => setTimeout(resolve, ${seconds * 1000}));\n`;
    };

    // NEW: Loop block
    Blockly.Blocks['robot_repeat'] = {
      init: function() {
        this.jsonInit({
          "type": "robot_repeat",
          "message0": "Repeat %1 times",
          "args0": [
            {
              "type": "field_number",
              "name": "TIMES",
              "value": 5,
              "min": 1,
              "max": 50,
              "precision": 1
            }
          ],
          "message1": "do %1",
          "args1": [
            {
              "type": "input_statement",
              "name": "DO"
            }
          ],
          "previousStatement": null,
          "nextStatement": null,
          "colour": 120,
          "tooltip": "Repeat the blocks inside this loop a specific number of times"
        });
      }
    };

    javascriptGenerator.forBlock['robot_repeat'] = function(block, generator) {
      const times = block.getFieldValue('TIMES');
      const branch = generator.statementToCode(block, 'DO');
      const code = `for (let count = 0; count < ${times}; count++) {\n${branch}}\n`;
      return code;
    };

    // NEW: If/Else conditional block
    Blockly.Blocks['robot_if_wall'] = {
      init: function() {
        this.jsonInit({
          "type": "robot_if_wall",
          "message0": "if wall ahead",
          "message1": "do %1",
          "args1": [
            {
              "type": "input_statement",
              "name": "DO"
            }
          ],
          "message2": "else",
          "message3": "do %1",
          "args3": [
            {
              "type": "input_statement",
              "name": "ELSE"
            }
          ],
          "previousStatement": null,
          "nextStatement": null,
          "colour": 210,
          "tooltip": "Check if there's a wall ahead and do different actions"
        });
      }
    };

    javascriptGenerator.forBlock['robot_if_wall'] = function(block, generator) {
      const doBranch = generator.statementToCode(block, 'DO');
      const elseBranch = generator.statementToCode(block, 'ELSE');
      const code = `if (await robot.checkWall()) {\n${doBranch}} else {\n${elseBranch}}\n`;
      return code;
    };

    // Check screen size for responsive toolbox
    const isMobile = window.innerWidth < 768;

    // Use flyout toolbox for all sizes - better UX, no closing issues
    const toolbox = {
      kind: 'flyoutToolbox',
      contents: [
        {
          kind: 'label',
          text: 'Movement'
        },
        {
          kind: 'block',
          type: 'robot_move_forward'
        },
        {
          kind: 'block',
          type: 'robot_move_backward'
        },
        {
          kind: 'block',
          type: 'robot_turn_left'
        },
        {
          kind: 'block',
          type: 'robot_turn_right'
        },
        {
          kind: 'block',
          type: 'robot_turn_around'
        },
        {
          kind: 'label',
          text: 'Actions'
        },
        {
          kind: 'block',
          type: 'robot_collect'
        },
        {
          kind: 'block',
          type: 'robot_wait'
        },
        {
          kind: 'label',
          text: 'Loops'
        },
        {
          kind: 'block',
          type: 'robot_repeat',
          fields: {
            TIMES: 7
          }
        },
        {
          kind: 'label',
          text: 'Conditionals'
        },
        {
          kind: 'block',
          type: 'robot_if_wall'
        }
      ]
    };

    // Initialize workspace
    workspaceRefInternal.current = Blockly.inject(blocklyDiv.current, {
      toolbox: toolbox,
      scrollbars: true,
      trashcan: true,
      zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2
      },
      grid: {
        spacing: 20,
        length: 3,
        colour: '#ccc',
        snap: true
      },
      move: {
        scrollbars: {
          horizontal: true,
          vertical: true
        },
        drag: true,
        wheel: false
      },
      toolboxPosition: 'start'
    });

    // Expose workspace to parent component if ref provided
    if (workspaceRef) {
      workspaceRef.current = workspaceRefInternal.current;
    }

    // Listen for changes and generate code
    const updateCode = () => {
      try {
        const code = javascriptGenerator.workspaceToCode(workspaceRefInternal.current);
        onCodeChange(code);
      } catch (error) {
        console.error('Error generating code:', error);
      }
    };

    workspaceRefInternal.current.addChangeListener(updateCode);

    return () => {
      if (workspaceRefInternal.current) {
        workspaceRefInternal.current.dispose();
      }
    };
  }, [onCodeChange]);

  return (
    <div 
      ref={blocklyDiv} 
      style={{ 
        height: '500px', 
        width: '100%',
        minHeight: '400px',
        borderRadius: '12px',
        overflow: 'hidden'
      }} 
    />
  );
};

export default BlocklyEditor;