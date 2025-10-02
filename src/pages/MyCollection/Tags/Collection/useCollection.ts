import { useState } from "react"

const useCollection = () => {
    const [viewMode, setViewMode] = useState<'grid' | 'list' | 'smallGrid'>('smallGrid')
    const templates = [
        { id: 1, name: 'Template 1', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', author: 'Author 1', view: 100, like: 100, comment: 100 },
        { id: 2, name: 'Template 2', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', author: 'Author 2', view: 100, like: 100, comment: 100 },
        { id: 3, name: 'Template 3', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', author: 'Author 3', view: 100, like: 100, comment: 100 },
        { id: 4, name: 'Template 4', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', author: 'Author 4', view: 100, like: 100, comment: 100 },
        { id: 5, name: 'Template 5', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', author: 'Author 5', view: 100, like: 100, comment: 100 },
      ]
    return {
        viewMode,
        setViewMode,
        templates,
    }
}

export default useCollection