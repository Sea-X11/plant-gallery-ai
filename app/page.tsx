"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { fetchPlantImages, getPlantRecommendation } from "./actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Loader2, Search, Upload, ArrowUp } from "lucide-react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { PlantRecommendationCard } from "./components/plant-recommendation-card"
import { DynamicTitle } from "./components/dynamic-title"

interface Image {
  id: number
  webformatURL: string
  largeImageURL: string
  tags: string
  user: string
}

interface PlantRecommendation {
  name: string
  recommendation: string
}

export default function PlantGallery() {
  const [images, setImages] = useState<Image[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [plantRecommendations, setPlantRecommendations] = useState<PlantRecommendation[]>([])
  const [aiLoading, setAiLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [selectedPlant, setSelectedPlant] = useState<string | null>(null)
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery)
      setPage(1)
      loadImages(searchQuery, 1)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchQuery])

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  async function loadImages(query: string, pageNum: number) {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchPlantImages(query, pageNum)
      if (pageNum === 1) {
        setImages(data.hits)
      } else {
        setImages((prev) => [...prev, ...data.hits])
      }
      setHasMore(data.hits.length === 12)
    } catch (error) {
      console.error("Error loading images:", error)
      setError("Failed to load images. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    setPage(1)
    setUploadedImage(null)
    setPlantRecommendations([])
    setUploadProgress(0)
    loadImages(searchQuery, 1)
  }

  const handleGetPlantRecommendation = async (imageData?: string) => {
    if (!searchQuery && !imageData) {
      setError("Please enter a query or upload an image before fetching recommendations.")
      return
    }

    try {
      setAiLoading(true)
      setError(null)
      const recommendations = await getPlantRecommendation(searchQuery, imageData)
      setPlantRecommendations(recommendations)
      if (recommendations.length > 0) {
        setSelectedPlant(recommendations[0].name)
        loadImages(recommendations[0].name, 1)
      }
    } catch (error: unknown) {
      console.error("Error in handleGetPlantRecommendation:", error)
      if (error instanceof Error) {
        setError(`Failed to get plant recommendations: ${error.message}`)
      } else {
        setError("An unknown error occurred. Please try again later.")
      }
    } finally {
      setAiLoading(false)
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError("File size exceeds 10MB limit. Please choose a smaller file.")
        return
      }

      setSearchQuery("Analyzing plants in the uploaded")
      const reader = new FileReader()
      reader.onloadstart = () => {
        setUploadProgress(0)
        setError(null)
      }
      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          setUploadProgress((e.loaded / e.total) * 100)
        }
      }
      reader.onloadend = () => {
        setUploadProgress(100)
        const base64String = reader.result as string
        setUploadedImage(base64String)
        handleGetPlantRecommendation(base64String.split(",")[1])
      }
      reader.onerror = () => {
        setError("An error occurred while reading the file. Please try again.")
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePlantClick = useCallback((plantName: string) => {
    setSelectedPlant(plantName)
    loadImages(plantName, 1)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <DynamicTitle />
      <div className="max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-center mb-8">Plant Gallery</h1>

        <div className="relative mb-4">
          <Input
            type="search"
            placeholder="Search plants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button
            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent transition-colors duration-200"
            variant="ghost"
            onClick={() => {
              if (searchQuery.trim()) {
                handleSearch()
              }
            }}
          >
            <Search className="h-5 w-5 text-gray-400 hover:text-primary transition-colors duration-200" />
          </Button>
        </div>

        <div className="flex gap-2 mb-4">
          <Button onClick={() => handleGetPlantRecommendation()} disabled={aiLoading} className="flex-grow">
            {aiLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Getting AI Recommendations...
              </>
            ) : (
              "Get Plant Recommendation by AI"
            )}
          </Button>
          <Button onClick={() => fileInputRef.current?.click()} disabled={aiLoading} className="flex-shrink-0">
            <Upload className="h-4 w-4" />
          </Button>
          <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
        </div>
        {uploadProgress > 0 && uploadProgress < 100 && <Progress value={uploadProgress} className="w-full" />}
      </div>

      {aiLoading && (
        <div className="flex justify-center items-center space-x-2 mb-4">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Analyzing and generating recommendations...</span>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {uploadedImage && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Uploaded Image</h2>
          <Dialog>
            <DialogTrigger asChild>
              <div className="w-full max-w-md mx-auto rounded-lg shadow-lg cursor-pointer overflow-hidden">
                <Image
                  src={uploadedImage || "/placeholder.svg"}
                  alt="Uploaded plant"
                  width={300}
                  height={200}
                  layout="responsive"
                  objectFit="cover"
                  className="w-full"
                  style={{ maxWidth: "90vw", maxHeight: "40vh", objectFit: "cover" }}
                />
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <Image
                src={uploadedImage || "/placeholder.svg"}
                alt="Uploaded plant"
                width={1000}
                height={600}
                layout="responsive"
                objectFit="contain"
                className="w-full h-auto"
              />
            </DialogContent>
          </Dialog>
        </div>
      )}

      {plantRecommendations.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">AI Plant Recommendations</h2>
          <div className="grid grid-cols-1 gap-4">
            {plantRecommendations.map((plant, index) => (
              <PlantRecommendationCard
                key={index}
                name={plant.name}
                recommendation={plant.recommendation}
                selected={selectedPlant === plant.name}
                onClick={() => handlePlantClick(plant.name)}
              />
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image) => (
          <Dialog key={`${image.id}-${image.webformatURL}`}>
            <DialogTrigger asChild>
              <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="relative">
                    <Image
                      src={image.webformatURL || "/placeholder.svg"}
                      alt={image.tags}
                      width={500}
                      height={300}
                      className="w-full h-64 object-cover transition-transform hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {image.tags.split(",").slice(0, 3).join(", ")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <Image
                src={image.largeImageURL || "/placeholder.svg"}
                alt={image.tags}
                width={1000}
                height={600}
                className="w-full h-auto object-contain"
              />
            </DialogContent>
          </Dialog>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center mt-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )}

      {!loading && hasMore && images.length > 0 && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={() => {
              setPage((prev) => prev + 1)
              loadImages(selectedPlant || searchQuery, page + 1)
            }}
          >
            Load More
          </Button>
        </div>
      )}

      {!loading && images.length === 0 && (
        <div className="text-center text-muted-foreground mt-8">No plants found. Try a different search term.</div>
      )}

      {showBackToTop && (
        <Button className="fixed bottom-4 right-4 rounded-full p-2" onClick={scrollToTop}>
          <ArrowUp className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}

