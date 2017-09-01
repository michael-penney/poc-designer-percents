import Vue, { CreateElement } from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';

import store from '../../store/index';
import FigureBounds from '../../store/model/figureBounds';
import Figure from '../../store/model/figure';
import { AddFigureChildPayload,
		SelectFigurePayload,
		SetFigureAbsolutePositionPayload,
		SetFigureBoundsPayload } from '../../store/mutations';

import { computeFigureBounds, computeChildBounds } from './utils/resolveFigureBounds';
import { beginDrag } from './utils/dragBehaviour';
import { mapSvgShapeProps, mapSvgGroupProps } from './utils/svgFigurePropsMapping';

@Component({
	name: 'design-figure',
	props: {
		canvas: Element,
		figure: Figure,
		parentBounds: FigureBounds
	}
})
export default class DesignFigure extends Vue {
	canvas: Element;
	figure: Figure;
	parentBounds: FigureBounds;

	dragging = false;
	dragOffset = { x: 0, y: 0 }

	created() {
		this.handleBoundsUpdated(this.figureBounds);
	}

	render(createElement: CreateElement) {
		const propValues = this.figure.propValues;
		const elemProps = mapSvgShapeProps(this.figureBounds, propValues);
		const shape = createElement(this.figure.type, {
			...elemProps,
			ref: "shape",
			on: {
				mousedown: this.mousedownHandler,
				click: this.clickHandler
			},
		});

		const childBounds = computeChildBounds(this.figureBounds, propValues);
		const children = this.figure.children.map((figure) => createElement(DesignFigure, {
			props: {
				canvas: this.canvas,
				parentBounds: childBounds,
				figure
			}
		}));

		const groupProps = mapSvgGroupProps(this.dragOffset.x, this.dragOffset.y);
		return createElement('g', groupProps, [
			shape,
			children ]);
	}

	get figureBounds() {
		return computeFigureBounds(this.parentBounds, this.figure.propValues);
	}

	get selected() {
		return store.state.selectedFigure === this.figure;
	}

	onDrag(evt: MouseEvent) {
		this.dragOffset.x += evt.movementX;
		this.dragOffset.y += evt.movementY;
	}

	mousedownHandler() {
		this.dragging = true;
		beginDrag(this.canvas, this.onDrag, this.onDragComplete);
	}

	onDragComplete() {
		this.dragging = false;
		if(Math.abs(this.dragOffset.x) > 0 || Math.abs(this.dragOffset.y) > 0) {
			const newX = this.figureBounds.minX + this.dragOffset.x;
			const newY = this.figureBounds.minY + this.dragOffset.y;

			this.resetDragOffset();
			store.commit(new SetFigureAbsolutePositionPayload(this.figure, newX, newY, this.figureBounds.width, this.figureBounds.height));
		}
	}

	resetDragOffset() {
		this.dragOffset.x = 0;
		this.dragOffset.y = 0;
	}

	clickHandler() {
		if (this.dragging) return;

		if (store.state.addChildMode) {
			store.commit(new AddFigureChildPayload(this.figure));
		} else {
			if (!this.selected) {
				store.commit(new SelectFigurePayload(this.figure));
			}
		}
	}

	mapNum(value: string, fn: (v: number) => number): string {
		const valf = parseFloat(value);
		return '' + fn(valf);
	}

	@Watch("figureBounds")
	handleBoundsUpdated(figureBounds: FigureBounds) {
		store.commit(new SetFigureBoundsPayload(this.figure, figureBounds));
	}
}


