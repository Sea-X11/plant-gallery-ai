'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface PlantRecommendationCardProps {
  name: string
  recommendation: string
  selected?: boolean
  onClick?: () => void
}

export function PlantRecommendationCard({ 
  name, 
  recommendation, 
  selected = false,
  onClick 
}: PlantRecommendationCardProps) {
  const [expanded, setExpanded] = useState(false)
  const previewLength = 150

  const toggleExpanded = (e: React.MouseEvent) => {
    e.stopPropagation()
    setExpanded(!expanded)
  }

  const needsExpansion = recommendation.length > previewLength

  return (
    <Card 
      className={`overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 ${
        selected ? 'ring-2 ring-primary' : ''
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <h3 className="text-lg font-bold mb-2">{name}</h3>
        <div className="space-y-2">
          <p className={`text-sm text-muted-foreground ${!expanded && needsExpansion ? 'line-clamp-3' : ''}`}>
            {recommendation}
          </p>
          {needsExpansion && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-2 flex items-center justify-center gap-1"
              onClick={toggleExpanded}
            >
              {expanded ? (
                <>
                  Show Less
                  <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Read More
                  <ChevronDown className="h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

