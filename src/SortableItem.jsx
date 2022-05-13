import React from 'react';
import { useSortable } from '@dnd-kit/sortable';

export const Item = React.forwardRef(function Item(
  { children, className, active, ...props },
  ref
) {
  return (
    <div
      {...props}
      ref={ref}
      className={
        'border border-gray-500 basis-24 rounded px-2 bg-gray-200 whitespace-nowrap text-ellipsis overflow-hidden flex-1 ' +
        className +
        (active ? ' z-10 shadow-lg' : '')
      }
    >
      {children}
    </div>
  );
});

export function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : null,
    transition,
  };

  return (
    <Item
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      {...props}
    >
      {props.id}
    </Item>
  );
}
