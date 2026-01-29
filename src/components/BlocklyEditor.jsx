import React, { useEffect, useRef } from 'react';
import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import { javascriptGenerator } from 'blockly/javascript';

const BlocklyEditor = ({ onCodeChange }) => {
  const blocklyDiv = useRef(null);
  const workspaceRef = useRef(null);

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
      return 'robot.moveForward();\n';
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
      return 'robot.turnLeft();\n';
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
      return 'robot.turnRight();\n';
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
  return 'robot.collect();\n';
};

    // Create toolbox
    const toolbox = {
      kind: 'flyoutToolbox',
      contents: [
        {
          kind: 'block',
          type: 'robot_move_forward'
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
          type: 'robot_collect'
        },
      ]
    };

    // Initialize workspace
    workspaceRef.current = Blockly.inject(blocklyDiv.current, {
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
      }
    });

    // Listen for changes and generate code
    const updateCode = () => {
      try {
        const code = javascriptGenerator.workspaceToCode(workspaceRef.current);
        onCodeChange(code);
      } catch (error) {
        console.error('Error generating code:', error);
      }
    };

    workspaceRef.current.addChangeListener(updateCode);

    return () => {
      if (workspaceRef.current) {
        workspaceRef.current.dispose();
      }
    };
  }, [onCodeChange]);

  return (
    <div 
      ref={blocklyDiv} 
      style={{ 
        height: '400px', 
        width: '100%',
        borderRadius: '12px',
        overflow: 'hidden'
      }} 
    />
  );
};

export default BlocklyEditor;