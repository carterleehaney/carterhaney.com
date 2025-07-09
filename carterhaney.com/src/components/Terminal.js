import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

{ /* This WHOLE component was vibe-coded by the way. I'm not that smart. */ }

const TerminalContainer = styled.div`
    background-color: #111827;
    color: #e5e7eb;
    font-family: 'Roboto Mono', monospace;
    padding: 20px;
    border-radius: 8px;
    overflow: auto;
    height: 400px;
    width: 600px;
    border: 2px solid #a9c1d9;
    box-shadow: 0 0 10px 2px #1e293b33;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    font-size: 0.7em; /* Even smaller terminal text */
`;

const TerminalOutputArea = styled.div`
    flex: 1;
    overflow-y: auto;
    margin-bottom: 10px;
    text-align: left;
    width: 100%;
`;

const TerminalOutput = styled.div`
    margin-bottom: 2px;
    white-space: pre-wrap;
    font-size: 0.7em; /* Even smaller output text */
`;

const TerminalInputContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

const TerminalPrompt = styled.span`
    margin-right: 5px;
    color: #38d46a;
    font-weight: bold;
`;

const TerminalInput = styled.input`
    background-color: transparent;
    border: none;
    color: #e5e7eb;
    font-family: 'Roboto Mono', monospace;
    font-size: 0.7em; /* Even smaller input text */
    outline: none;
    flex-grow: 1;
    padding: 2px 0;
`;

const TerminalInputHint = styled.span`
    color: #6b7280;
    font-size: 0.7em;
    margin-left: 8px;
    user-select: none;
    cursor: pointer;
    transition: opacity 0.2s;
    opacity: ${props => (props.hide ? 0 : 1)};
`;

const Terminal = () => {
    const [output, setOutput] = useState([
        { type: 'output', text: "Welcome to Carter's terminal. Enter 'help' to see a list of available commands." }
    ]);
    const [command, setCommand] = useState('');
    const [currentDirectory, setCurrentDirectory] = useState('~');
    const terminalInputRef = useRef(null);
    const outputAreaRef = useRef(null);
    const [fileSystem, setFileSystem] = useState({
        '~': {
            type: 'directory',
            files: {},
        },
    });
    const [inputFocused, setInputFocused] = useState(false);

    useEffect(() => {
        if (terminalInputRef.current) {
            terminalInputRef.current.focus();
        }
    }, []);

    // Scroll to bottom when output changes
    useEffect(() => {
        if (outputAreaRef.current) {
            outputAreaRef.current.scrollTop = outputAreaRef.current.scrollHeight;
        }
    }, [output]);

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            let newOutput = [...output];
            newOutput.push({ type: 'command', text: `${currentDirectory} > ${command}` });

            const commandParts = command.trim().split(' ');
            const baseCommand = commandParts[0];
            const args = commandParts.slice(1);

            switch (baseCommand) {
                case 'whoami':
                    newOutput.push({ type: 'output', text: 'guest' });
                    break;
                case 'ls':
                    const currentDirFiles = fileSystem[currentDirectory].files;
                    const files = Object.keys(currentDirFiles);
                    newOutput.push({ type: 'output', text: files.join(' ') });
                    break;
                case 'pwd':
                    newOutput.push({ type: 'output', text: currentDirectory });
                    break;
                case 'mkdir':
                    const newDirName = args[0];
                    if (newDirName) {
                        const newPath = `${currentDirectory}/${newDirName}`;
                        setFileSystem(prevFileSystem => {
                            const updatedFileSystem = { ...prevFileSystem };
                            updatedFileSystem[currentDirectory].files[newDirName] = { type: 'directory' };
                            updatedFileSystem[newPath] = { type: 'directory', files: {} };
                            return updatedFileSystem;
                        });
                    } else {
                        newOutput.push({ type: 'output', text: 'mkdir: missing operand' });
                    }
                    break;
                case 'cd':
                    const targetDir = args[0];
                    if (!targetDir) {
                        setCurrentDirectory('~');
                    } else if (targetDir === '..') {
                        const pathParts = currentDirectory.split('/');
                        pathParts.pop();
                        const newDir = pathParts.join('/') || '~';
                        if (fileSystem[newDir]) {
                            setCurrentDirectory(newDir);
                        } else {
                            newOutput.push({ type: 'output', text: `cd: no such file or directory: ${targetDir}` });
                        }
                    }
                    else {
                        const newPath = currentDirectory === '~' ? `~/${targetDir}` : `${currentDirectory}/${targetDir}`;
                        if (fileSystem[newPath] && fileSystem[newPath].type === 'directory') {
                            setCurrentDirectory(newPath);
                        } else {
                            newOutput.push({ type: 'output', text: `cd: no such file or directory: ${targetDir}` });
                        }
                    }
                    break;
                case 'echo':
                    newOutput.push({ type: 'output', text: args.join(' ') });
                    break;
                case 'clear':
                    newOutput = [];
                    break;
                case 'help':
                    newOutput.push({
                        type: 'output',
                        text: [
                            'Available commands:',
                            'help        Show this help message',
                            'whoami      Show current user',
                            'ls          List files and directories',
                            'pwd         Print working directory',
                            'mkdir [dir] Create a directory',
                            'cd [dir]    Change directory',
                            'echo [txt]  Print text',
                            'clear       Clear the terminal'
                        ].join('\n')
                    });
                    break;
                case '':
                    // Do nothing for empty input
                    break;
                default:
                    newOutput.push({ type: 'output', text: `Command not found: ${baseCommand}` });
            }

            setOutput(newOutput);
            setCommand('');
        }
    };

    return (
        <TerminalContainer>
            <TerminalOutputArea ref={outputAreaRef}>
                {output.map((item, index) => (
                    <TerminalOutput key={index}>
                        {item.type === 'command'
                            ? <span style={{ color: '#ffe066' }}>{item.text}</span>
                            : item.text}
                    </TerminalOutput>
                ))}
            </TerminalOutputArea>
            <TerminalInputContainer>
                <TerminalPrompt>{currentDirectory} &gt;</TerminalPrompt>
                <TerminalInput
                    type="text"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    onKeyDown={handleCommand}
                    ref={terminalInputRef}
                    autoFocus
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                />
                <TerminalInputHint
                    hide={inputFocused}
                    onClick={() => terminalInputRef.current && terminalInputRef.current.focus()}
                >
                    Click here...
                </TerminalInputHint>
            </TerminalInputContainer>
        </TerminalContainer>
    );
};

export default Terminal;