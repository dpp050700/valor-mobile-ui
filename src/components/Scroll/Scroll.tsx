import {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  ReactNode,
} from 'react'
import BScroll from 'better-scroll'
import { useDebounceFn } from 'ahooks'
import './scroll.scss'

interface ScrollProps {
  direction?: 'vertical' | 'horizental'
  click?: boolean
  refresh?: boolean
  pullUpLoading?: boolean
  pullDownLoading?: boolean
  bounceTop?: boolean
  bounceBottom?: boolean
  onScroll: Function
  pullUp?: () => void
  pullDown?: () => void
  children: ReactNode
  className?: string
}

interface PosData {
  x: number
  y: number
}

export const Scroll = forwardRef((props: ScrollProps, ref) => {
  const [bScroll, setBScroll] = useState<BScroll | null>(null)

  const scrollContaninerRef = useRef<HTMLDivElement | null>(null)

  const {
    direction = 'vertical',
    click = true,
    refresh = true,
    pullUpLoading = false,
    pullDownLoading = false,
    bounceTop = false,
    bounceBottom = true,
  } = props

  const { pullUp = () => {}, pullDown = () => {}, onScroll } = props

  const { run: pullUpDebounce } = useDebounceFn(pullUp, { wait: 500 })

  const { run: pullDownDebounce } = useDebounceFn(pullDown, { wait: 500 })

  useEffect(() => {
    const scroll = new BScroll(scrollContaninerRef.current!, {
      scrollX: direction === 'horizental',
      scrollY: direction === 'vertical',
      probeType: 3,
      click: click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom,
      },
    })
    setBScroll(scroll)
    return () => {
      setBScroll(null)
    }
  }, [])

  useEffect(() => {
    if (!bScroll || !onScroll) return
    bScroll.on('scroll', onScroll)
    return () => {
      bScroll.off('scroll', onScroll)
    }
  }, [onScroll, bScroll])

  useEffect(() => {
    if (!bScroll || !pullUp) return
    const handlePullUp = () => {
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUpDebounce()
      }
    }
    bScroll.on('scrollEnd', handlePullUp)
    return () => {
      bScroll.off('scrollEnd', handlePullUp)
    }
  }, [pullUp, pullUpDebounce, bScroll])

  useEffect(() => {
    if (!bScroll || !pullDown) return
    const handlePullDown = (pos: PosData) => {
      if (pos.y > 50) {
        pullDownDebounce()
      }
    }
    bScroll.on('touchEnd', handlePullDown)
    return () => {
      bScroll.off('touchEnd', handlePullDown)
    }
  }, [pullDown, pullDownDebounce, bScroll])

  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh()
    }
  })

  useImperativeHandle(ref, () => ({
    refresh() {
      if (bScroll) {
        bScroll.refresh()
        bScroll.scrollTo(0, 0)
      }
    },
    getBScroll() {
      if (bScroll) {
        return bScroll
      }
    },
  }))

  const PullUpdisplayStyle = pullUpLoading
    ? { display: '' }
    : { display: 'none' }
  const PullDowndisplayStyle = pullDownLoading
    ? { display: '' }
    : { display: 'none' }
  return (
    <div className='vm-scroll' ref={scrollContaninerRef}>
      {props.children}
      <div className='vm-scroll-pullUpLoading' style={PullUpdisplayStyle}>
        loading
      </div>
      <div className='vm-scroll-pullDownLoading' style={PullDowndisplayStyle}>
        loading
      </div>
    </div>
  )
})

