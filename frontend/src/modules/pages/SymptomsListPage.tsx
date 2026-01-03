import { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { listSymptoms, type Symptom } from '../services/api'
import { SymptomCard } from './components/SymptomCard'

export function SymptomsListPage() {
  const [search, setSearch] = useState('')
  const [items, setItems] = useState<Symptom[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const title = search.trim() || undefined
    let cancelled = false
    setLoading(true)
    setError(null)
    listSymptoms({ title })
      .then(r => { if (!cancelled) setItems(r.data) })
      .catch(e => { if (!cancelled) setError(String(e)) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [search])

  return (
    <>
      <h2 className="mb-3">Симптомы</h2>
      <Row className="g-2 mb-3">
        <Col md={6}>
          <Form.Control
            placeholder="Поиск по названию..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </Col>
      </Row>

      {error && <div className="alert alert-danger">Ошибка загрузки: {error}</div>}

      <Row xs={1} md={2} lg={3} className="g-3">
        {items.map(s => (
          <Col key={s.id}><SymptomCard s={s} /></Col>
        ))}
      </Row>
      {!loading && items.length === 0 && !error && (
        <div className="text-muted mt-3">Ничего не найдено</div>
      )}
    </>
  )
}
