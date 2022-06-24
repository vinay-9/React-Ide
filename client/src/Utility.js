// ignore this file



import React from 'react';
import CodeMirror from 'codemirror';
export type DOMEvent = 'onMouseDown' | 'onDblClick' | 'onTouchStart' | 'onContextMenu' | 'onKeyDown' | 'onKeyPress'
  | 'onKeyUp' | 'onCut' | 'onCopy' | 'onPaste' | 'onDragStart' | 'onDragEnter' | 'onDragOver' | 'onDragLeave' | 'onDrop';



  export type IDOMEvent = {
    [P in DOMEvent]?: (instance: CodeMirror.Editor, event: Event) => void;
  }


  export type Editor = CodeMirror.Editor;
  export interface IReactCodemirror extends IDOMEvent {
  onChange?: (instance: CodeMirror.Editor, change: CodeMirror.EditorChangeLinkedList[]) => void;
  onChanges?: (instance: CodeMirror.Editor, change: CodeMirror.EditorChangeLinkedList[]) => void;
  onBeforeChange?: (instance: CodeMirror.Editor, change: CodeMirror.EditorChangeCancellable) => void;
  onCursorActivity?: (instance: CodeMirror.Editor) => void;
  onBeforeSelectionChange?: (instance: CodeMirror.Editor, selection: { head: Position; anchor: Position; }) => void;
  onViewportChange?: (instance: CodeMirror.Editor, from: number, to: number) => void;
  onGutterClick?: (instance: CodeMirror.Editor, line: number, gutter: string, clickEvent: Event) => void;

  onFocus?: (instance: CodeMirror.Editor) => void;
  onBlur?: (instance: CodeMirror.Editor) => void;
  onScroll?: (instance: CodeMirror.Editor) => void;

  onUpdate?: (instance: CodeMirror.Editor) => void;
  onRenderLine?: (instance: CodeMirror.Editor, line: CodeMirror.LineHandle, element: HTMLElement) => void;
  onOverwriteToggle?: (instance: CodeMirror.Editor, overwrite: boolean) => void;
  onCursorActivity?(instance: CodeMirror.Editor): void;
  onDelete?(): void;
  onBeforeCursorEnter?(): void;
  onClear?(): void;
  onHide?(): void;
  onUnhide?(): void;
  onRedraw?(): void;
}



   {/* <CodeMirror
            value={code}
            options={{
                theme: 'dracula',
                tabSize: 4,
                keyMap: 'sublime',
                mode: 'C++',
                addMode: true,
                gutters:{
                    width: "30%"
                    
                }
                
            }}
            style={{"height": "0px"}}
            /> */}