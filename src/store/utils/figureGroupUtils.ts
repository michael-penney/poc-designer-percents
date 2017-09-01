import Figure from '../model/figure';

export function addChildToFigure(rootFiguresList: Figure[], target: Figure, child: Figure) {
    // does target have child as a parent?
    let figureInCommon = getFigureInCommon(target, child);
    if(figureInCommon != null) {

        // remove the common-figure from child
        const idx = child.children.indexOf(figureInCommon);
        if(idx > -1) {
            child.children.splice(idx, 1);
        }

        // common-figure's parent becomes child's parent
        const children = child.parent == null ? rootFiguresList : child.parent.children;
        children.push(figureInCommon);
        figureInCommon.parent = child.parent;
    }

    // remove the child from its old parent
    const oldParentFigures = child.parent == null ? rootFiguresList : child.parent.children;
    const idx = oldParentFigures.indexOf(child);
    if(idx > -1) {
        oldParentFigures.splice(idx, 1);
    }

    // figure becomes a child of target
    target.children.push(child);

    // target becomes a parent of the child
    child.parent = target;
}


function getFigureInCommon(figure: Figure, parent: Figure): Figure|null {
    while(figure.parent != null) {
        if(figure.parent === parent) {
            return figure;
        }
        figure = figure.parent;
    }
    return null;
}
