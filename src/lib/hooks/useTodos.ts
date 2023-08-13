import DOMPurify from "dompurify";
import { TodoStatus } from "../../types.js";

export const useTodos = (todos: Todo[]): TodoList[] => {
    let todoBoard: TodoList[] = [
      { id: 1, title: "TODO", todos: [] },
      { id: 2, title: "DOING", todos: [] },
      { id: 3, title: "DONE", todos: [] },
    ];

    sanitizeTodos(todos).forEach((todo) => {
      switch (todo.status) {
        case TodoStatus.Todo:
          todoBoard[0].todos.push(todo);
          break;
        case TodoStatus.InProgress:
          todoBoard[1].todos.push(todo);
          break;
        case TodoStatus.Done:
          todoBoard[2].todos.push(todo);
          break;
      }
    });
    return todoBoard;
};

const sanitizeTodos = (todos: Todo[]) => todos.map((todo) => ({
  ...todo, 
  content: parseAndRenderUrls(todo.content) 
}));

const parseAndRenderUrls = (content: string) => {
  const urlRegex = /(?:https?|ftp):\/\/[^\s/$.?#].[^\s]*/g;
  const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

  // HTML is sanitized to prevent XSS attacks
  const sanitized = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ["a"],
    ALLOWED_ATTR: ["href", "target", "class"],
  });

  const anchorTags: string[] = []; 
  const placeholder = "<!--ANCHOR_PLACEHOLDER-->";

  // Replace markdown links with placeholders and store the anchor tags in an array
  const parsedMarkdown = sanitized.replace(markdownLinkRegex, (match, text, url) => {
    anchorTags.push(`<a href="${url}" class="anchor" target="_blank">${text}</a>`);
    return placeholder;
  });

  // Replace urls with anchor tags
  const parsedContentWithPlaceholders = parsedMarkdown.replace(urlRegex, (url) => {
    return `<a href="${url}" class="anchor" target="_blank">${url}</a>`
  });

  // Replace the placeholders with anchor tags
  return parsedContentWithPlaceholders.replace(new RegExp(placeholder, "g"), () => anchorTags.shift() || "");
};