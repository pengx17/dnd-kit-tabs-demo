import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';

import { SortableItem, Item } from './SortableItem';

const range = (num, fill = (_, i) => i) => new Array(num).fill(0).map(fill);
const _items = range(5, () => faker.name.findName());
const placeholders = range(3).map((i) => (
  <div key={i} className="grow w-0 basis-0"></div>
));

export function App() {
  const [items, setItems] = useState(_items);
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="inline-flex border m-4 gap-0.5 flex-wrap">
        <SortableContext items={items} strategy={horizontalListSortingStrategy}>
          {items.map((id) => (
            <SortableItem active={id === activeId} key={id} id={id} />
          ))}
          {/* <DragOverlay>{activeId ? <Item>{activeId}</Item> : null}</DragOverlay> */}
        </SortableContext>
        {placeholders}
      </div>
      <button
        onClick={() =>
          setItems((__items) => [...__items, faker.name.findName()])
        }
      >
        <Item className="fixed bottom-2 right-2">+</Item>
      </button>
    </DndContext>
  );

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event) {
    setActiveId(null);
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
}
