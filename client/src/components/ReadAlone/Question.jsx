import React, { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { Button } from "@/components/ui/button"

// Helper function to shuffle an array
const shuffleArray = (array) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function Question({ question, onAnswer, userAnswer }) {
  const [blocks, setBlocks] = useState([])

  useEffect(() => {
    // Initialize and shuffle blocks when the question changes
    if (question.blocks) {
      const shuffledBlocks = shuffleArray(
        question.blocks
          .filter((block) => block.showInOption)
          .map((block, index) => ({
            ...block,
            id: `block-${index}`, // Ensure unique IDs
          })),
      )
      setBlocks(shuffledBlocks)
    } else {
      // If there are no blocks, create them from the title
      const titleBlocks = question.title.split(" ").map((word, index) => ({
        id: `block-${index}`,
        text: word,
        showInOption: true,
      }))
      setBlocks(shuffleArray(titleBlocks))
    }
  }, [question])

  const handleDragEnd = (result) => {
    if (!result.destination) return

    const items = Array.from(blocks)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setBlocks(items)
    onAnswer(items.map((block) => block.text).join(" "))
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">{question.title}</h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="blocks" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-wrap gap-3 p-4 bg-secondary rounded-lg min-h-[60px]"
            >
              {blocks.map((block, index) => (
                <Draggable key={block.id} draggableId={block.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`bg-primary text-primary-foreground px-4 py-2 rounded-md cursor-move shadow-md transition-all ${
                        snapshot.isDragging ? "scale-105 z-10" : ""
                      }`}
                      style={{
                        ...provided.draggableProps.style,
                      }}
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
      <p className="text-sm text-muted-foreground italic">Drag and drop the blocks to form the correct sentence.</p>
    </div>
  )
}

export default Question

