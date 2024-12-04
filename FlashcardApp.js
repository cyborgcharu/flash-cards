import React, { useState } from 'react';
import { Plus, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const FlashcardApp = () => {
  const [cards, setCards] = useState([
    { front: "What is React?", back: "A JavaScript library for building user interfaces" },
    { front: "What is JSX?", back: "A syntax extension for JavaScript that allows writing HTML-like code" },
    { front: "What is a Component?", back: "A reusable piece of UI that can contain its own logic and styling" }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [newFront, setNewFront] = useState("");
  const [newBack, setNewBack] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
    setIsFlipped(false);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    setIsFlipped(false);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAddCard = () => {
    if (newFront.trim() && newBack.trim()) {
      setCards([...cards, { front: newFront, back: newBack }]);
      setNewFront("");
      setNewBack("");
      setIsAdding(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Flashcards</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsAdding(!isAdding)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Card
        </Button>
      </div>

      {isAdding ? (
        <Card className="p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Front</label>
              <Input
                value={newFront}
                onChange={(e) => setNewFront(e.target.value)}
                placeholder="Enter front text"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Back</label>
              <Input
                value={newBack}
                onChange={(e) => setNewBack(e.target.value)}
                placeholder="Enter back text"
              />
            </div>
            <Button onClick={handleAddCard}>Save Card</Button>
          </div>
        </Card>
      ) : (
        <>
          <Card 
            className="min-h-64 flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:shadow-lg"
            onClick={handleFlip}
          >
            <CardContent className="text-center p-6">
              <div className="text-xl">
                {isFlipped ? cards[currentIndex].back : cards[currentIndex].front}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={cards.length <= 1}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <div className="text-sm text-gray-500">
              Card {currentIndex + 1} of {cards.length}
            </div>
            <Button
              variant="outline"
              onClick={handleNext}
              disabled={cards.length <= 1}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default FlashcardApp;