import { useEffect } from 'react'
import Shepherd from 'shepherd.js'
import 'shepherd.js/dist/css/shepherd.css'
import useAuth from '../hooks/useAuth'

const OnboardingTour = () => {
  const { user } = useAuth()

  useEffect(() => {
    const hasSeenTour = localStorage.getItem(`tour-completed-${user?.email}`)
    if (hasSeenTour) return

    const tour = new Shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: {
        classes: 'shadow-xl rounded-2xl',
        scrollTo: true,
        cancelIcon: { enabled: true },
        buttons: [
          {
            text: 'Skip Tour',
            classes: 'shepherd-button-secondary',
            action() { tour.complete() }
          },
          {
            text: 'Next →',
            classes: 'shepherd-button-primary',
            action() { tour.next() }
          }
        ]
      }
    })

    tour.addStep({
      id: 'welcome',
      text: `<strong>Welcome to PayEase, ${user?.firstName}! 👋</strong><br/><br/>Let us show you around in just a few steps.`,
      attachTo: null,
      buttons: [
        { text: 'Skip', classes: 'shepherd-button-secondary', action() { tour.complete() } },
        { text: "Let's Go! →", classes: 'shepherd-button-primary', action() { tour.next() } }
      ]
    })

    tour.addStep({
      id: 'balance',
      text: '<strong>Your Wallet Balance</strong><br/><br/>This shows your current wallet balance. Fund it to start paying bills.',
      attachTo: { element: '.wallet-balance-card', on: 'bottom' },
    })

    tour.addStep({
      id: 'quick-actions',
      text: '<strong>Quick Actions</strong><br/><br/>Use these buttons to quickly fund your wallet or pay bills.',
      attachTo: { element: '.quick-actions', on: 'bottom' },
    })

    tour.addStep({
      id: 'sidebar',
      text: '<strong>Navigation</strong><br/><br/>Use the sidebar to navigate between pages — Transactions, Bill Payment, Notifications and Profile.',
      attachTo: { element: 'aside', on: 'right' },
    })

    tour.addStep({
      id: 'done',
      text: '<strong>You\'re all set! 🎉</strong><br/><br/>Start by funding your wallet and paying your first bill.',
      buttons: [
        { text: 'Get Started!', classes: 'shepherd-button-primary', action() { tour.complete() } }
      ]
    })

    tour.on('complete', () => {
      localStorage.setItem(`tour-completed-${user?.email}`, 'true')
    })

    tour.on('cancel', () => {
      localStorage.setItem(`tour-completed-${user?.email}`, 'true')
    })

    // Start tour after a brief delay
    const timer = setTimeout(() => tour.start(), 1000)
    return () => clearTimeout(timer)
  }, [user])

  return null
}

export default OnboardingTour