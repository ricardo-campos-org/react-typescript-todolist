import { TaskResponse } from '../types/TaskResponse';
import USER_LANG from '../types/UserLangs';
import { translateServerResponsePtBr, translateTimeAgoPtBr, translateTimeLeftPtBr } from './PortugueseUtils';
import { translateServerResponseRu, translateTimeAgoRu, translateTimeLeftRu } from './RussianUtils';
import { translateServerResponseEs, translateTimeAgoEs, translateTimeLeftEs } from './SpanishUtils';

/**
 * Translates a given message to a given language
 *
 * @param {string} message The message to be translated.
 * @param {string} target The target language. One of USER_LANG
 * @returns {string} The translated message.
 */
function translateTimeMessage(message: string, target: string): string {
  if (target === USER_LANG.ENGLISH) {
    return message;
  }

  const firstSpace = message.indexOf(' ');
  const numberValue = parseInt(message.substring(0, firstSpace));
  const textValue = message.substring(firstSpace).trim();

  if (message.includes(' ago')) {
    if (target === USER_LANG.PORTUGUESE) {
      return translateTimeAgoPtBr(textValue, numberValue);
    }
    if (target === USER_LANG.SPANISH) {
      return translateTimeAgoEs(textValue, numberValue);
    }

    return translateTimeAgoRu(textValue, numberValue);
  }

  if (message.includes(' left')) {
    if (target === USER_LANG.PORTUGUESE) {
      return translateTimeLeftPtBr(textValue, numberValue);
    }
    if (target === USER_LANG.SPANISH) {
      return translateTimeLeftEs(textValue, numberValue);
    }

    return translateTimeLeftRu(textValue, numberValue);
  }

  return message;
}

/**
 * Translates a server response message from English to a target language.
 *
 * @param {string} message The text message to be translated.
 * @param {string} target The target language to be translated.
 * @returns The translated message.
 */
function translateServerResponse(message: string, target: string): string {
  if (target === USER_LANG.PORTUGUESE) {
    return translateServerResponsePtBr(message);
  }
  if (target === USER_LANG.SPANISH) {
    return translateServerResponseEs(message);
  }

  return translateServerResponseRu(message);
}

/**
 * Translates all responses from tasks server API.
 *
 * @param {TaskResponse[]} tasks The tasks to be translated.
 * @param {string} target The target language.
 * @returns {TaskResponse[]} Array of tasks translated into the target language.
 */
function translateTaskResponse(tasks: TaskResponse[], target: string): TaskResponse[] {
  tasks.forEach((task: TaskResponse) => {
    task.lastUpdate = translateTimeMessage(task.lastUpdate, target);
    if (task.dueDateFmt) {
      task.dueDateFmt = translateTimeMessage(task.dueDateFmt, target);
    }
  });
  return tasks;
}

export { translateTaskResponse, translateServerResponse };
