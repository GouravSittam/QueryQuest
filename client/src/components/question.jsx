import React, { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

function Question({ question, onAnswer, userAnswer }) {
  const [blocks, setBlocks] = useState([])

  useEffect(() => {
    setBlocks(question.blocks.filter((block) => block.showInOption))
  }, [question])

  const handleDragEnd = (result) => {
    if (!result.destination) return

    const items = Array.from(blocks)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setBlocks(items)
    onAnswer(items.map((item) => item.text).join(""))
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{question.title}</h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="blocks" direction="horizontal">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="flex flex-wrap gap-2">
              {blocks.map((block, index) => (
                <Draggable key={block.text} draggableId={block.text} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="bg-primary text-primary-foreground px-3 py-2 rounded-md cursor-move"
                    >
                      {block.text}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <p className="text-sm text-muted-foreground">Drag and drop the blocks to rearrange them.</p>
    </div>
  )
}

export default Question

