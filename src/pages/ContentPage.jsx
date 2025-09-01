import React, { useEffect, useState } from 'react'
import api from '../lib/api'
import ContentCard from '../components/ContentCard'

export default function ContentPage() {
  const [contents, setContents] = useState([])

  useEffect(() => {
    api.get('/api/content')
      .then(res => setContents(res.data))
      .catch(() => setContents([]))
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-bold text-purple-600 mb-4">کتابخانه محتوا</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {contents.map((item) => (
          <ContentCard
            key={item.id}
            title={item.title}
            description={item.description}
            type={item.type}
            views={item.views || 0}
            likes={item.likes || 0}
            onLike={() => console.log('Liked', item.id)}
            onComplete={() => console.log('Completed', item.id)}
          />
        ))}
      </div>
    </div>
  )
}
