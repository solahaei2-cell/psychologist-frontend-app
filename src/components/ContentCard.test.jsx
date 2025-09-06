import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import ContentCard from './ContentCard'

describe('ContentCard', () => {
  const item = {
    id: 1,
    title: 'مدیریت استرس روزانه',
    description: 'یاد بگیرید چطور استرس را کنترل کنید.',
    type: 'مقاله',
    category: 'استرس',
    level: 'مبتدی',
    duration: '۵ دقیقه',
    likes: 12,
    views: 180,
  }
  const onLike = jest.fn()
  const onComplete = jest.fn()

  it('renders content card correctly', () => {
    render(<ContentCard item={item} onLike={onLike} onComplete={onComplete} />)
    expect(screen.getByText('مدیریت استرس روزانه')).toBeInTheDocument()
    expect(screen.getByText('📄')).toBeInTheDocument()
    expect(screen.getByText('بازدید: 180')).toBeInTheDocument()
    expect(screen.getByText('لایک: 12')).toBeInTheDocument()
  })

  it('calls onLike when like button is clicked', () => {
    render(<ContentCard item={item} onLike={onLike} onComplete={onComplete} />)
    fireEvent.click(screen.getByText('🤍'))
    expect(onLike).toHaveBeenCalledWith(item)
  })

  it('calls onComplete when complete button is clicked', () => {
    render(<ContentCard item={item} onLike={onLike} onComplete={onComplete} />)
    fireEvent.click(screen.getByText('تکمیل شد'))
    expect(onComplete).toHaveBeenCalledWith(item)
  })
})