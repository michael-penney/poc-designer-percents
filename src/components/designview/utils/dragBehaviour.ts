export function beginDrag(canvas: Element, handleDrag: (evt: MouseEvent) => void, handleDragComplete: () => void) {
    
    function mouseMovedHandler(evt: MouseEvent) {
        handleDrag.apply(self, [evt]);
    }

    function mouseUpHandler(evt: MouseEvent) {
        canvas.removeEventListener('mouseup', mouseUpHandler);
        canvas.removeEventListener('mousemove', mouseMovedHandler);
        handleDragComplete.apply(self);
    }

    canvas.addEventListener('mouseup', mouseUpHandler);
    canvas.addEventListener('mousemove', mouseMovedHandler);
}
