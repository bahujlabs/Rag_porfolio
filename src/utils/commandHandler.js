import {commands} from '../data/command.js'

export function handleCommand(input) {
  const command = input.trim().toLowerCase().split(" ")[0];
  return commands[command] || null;
}

export function isCommand(input) {
  return input.trim().startsWith("/");
}