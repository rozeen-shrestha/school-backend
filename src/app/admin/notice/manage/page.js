"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

export default function ManageNoticePage() {
  const [title, setTitle] = useState({ en: "", np: "" })
  const [news, setNews] = useState([{ en: "", np: "" }])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchNotice = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/notice")
        const data = await res.json()
        if (data.success) {
          setTitle(data.title)
          setNews(data.news.length ? data.news : [{ en: "", np: "" }])
        }
      } catch (e) {
        toast({ title: "Error", description: "Failed to load notice", variant: "destructive" })
      }
      setLoading(false)
    }
    fetchNotice()
  }, [])

  const handleNewsChange = (idx, lang, value) => {
    setNews(news =>
      news.map((item, i) => (i === idx ? { ...item, [lang]: value } : item))
    )
  }

  const addNews = () => setNews([...news, { en: "", np: "" }])
  const removeNews = idx => setNews(news => news.filter((_, i) => i !== idx))

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch("/api/notice", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, news: news.filter(n => n.en || n.np) })
      })
      const data = await res.json()
      if (data.success) {
        toast({ title: "Notice updated", description: "Notice has been updated." })
      } else {
        toast({ title: "Error", description: data.error || "Failed to update", variant: "destructive" })
      }
    } catch (e) {
      toast({ title: "Error", description: "Failed to update", variant: "destructive" })
    }
    setSaving(false)
  }

  return (
    <div className="h-full w-full p-8 space-y-8 bg-card">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Manage Notice</h2>
        <p className="text-muted-foreground">Edit the notice title and news items shown on the homepage.</p>
      </div>
      <Card className="bg-background max-w-2xl">
        <CardHeader>
          <CardTitle>Edit Notice</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </div>
          ) : (
            <form
              onSubmit={e => {
                e.preventDefault()
                handleSave()
              }}
              className="space-y-6"
            >
              <div>
                <label className="block font-medium mb-1">Notice Title (English)</label>
                <input
                  className="w-full border rounded px-3 py-2"
                  value={title.en}
                  onChange={e => setTitle(t => ({ ...t, en: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Notice Title (Nepali)</label>
                <input
                  className="w-full border rounded px-3 py-2"
                  value={title.np}
                  onChange={e => setTitle(t => ({ ...t, np: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-2">News Items</label>
                {news.map((item, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input
                      className="flex-1 border rounded px-2 py-1"
                      placeholder="English"
                      value={item.en}
                      onChange={e => handleNewsChange(idx, "en", e.target.value)}
                      required
                    />
                    <input
                      className="flex-1 border rounded px-2 py-1"
                      placeholder="Nepali"
                      value={item.np}
                      onChange={e => handleNewsChange(idx, "np", e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeNews(idx)}
                      disabled={news.length === 1}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addNews}>
                  Add News Item
                </Button>
              </div>
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save Notice"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
