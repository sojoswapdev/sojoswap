import React, { Suspense, useEffect, useState } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import GoogleAnalyticsReporter from '../components/analytics/GoogleAnalyticsReporter'
import AddressClaimModal from '../components/claim/AddressClaimModal'
import Header from '../components/Header'
import Polling from '../components/Header/Polling'
import URLWarning from '../components/Header/URLWarning'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
import { ApplicationModal } from '../state/application/actions'
import { useModalOpen, useToggleModal } from '../state/application/hooks'
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader'
import AddLiquidity from './AddLiquidity'
import {
  RedirectDuplicateTokenIds,
  RedirectOldAddLiquidityPathStructure,
  RedirectToAddLiquidity
} from './AddLiquidity/redirects'
import Earn from './Earn'
import Manage from './Earn/Manage'
import MigrateV1 from './MigrateV1'
import MigrateV1Exchange from './MigrateV1/MigrateV1Exchange'
import RemoveV1Exchange from './MigrateV1/RemoveV1Exchange'
import Pool from './Pool'
import PoolFinder from './PoolFinder'
import RemoveLiquidity from './RemoveLiquidity'
import { RedirectOldRemoveLiquidityPathStructure } from './RemoveLiquidity/redirects'
import Swap from './Swap'
import Home from './Home'
import { OpenClaimAddressModalAndRedirectToSwap, RedirectPathToSwapOnly, RedirectToSwap } from './Swap/redirects'
import Vote from './Vote'
import VotePage from './Vote/VotePage'
import { keyframes } from 'styled-components'
import { MarsWeather } from 'components/MarsWeather'
import Disperse from './Disperse'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
  min-height: 100vh;
`

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
  z-index: 2;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 100px;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 10;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 16px;
    padding-top: 2rem;
  `};

  z-index: 1;
`

const Marginer = styled.div`
  margin-top: 5rem;
`

const Welcome = styled.h1`
  position: fixed;
  font-size: 170px;
  width: 100%;
  top: -30px;
  opacity: 0;
  pointer-events: none;
`

const Trading = styled.div`
  position: relative;
  max-width: 250px;
  width: 100%;
  border-radius: 15px;
  background: linear-gradient(45deg, #00000080, #00000040);
  box-shadow: 0 0 2px #ffffff59, 0 0 10px inset #00000080;
  backdrop-filter: blur(5px);
  display: none;
  z-index: 1;
  pointer-events: none;
  h2 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
    font-weight: 100;
    color: #fff !important;
  }
  @media only screen and (max-width: 1400px) {
    display: block;
    max-width: 600px;
    height: 200px;
    margin: 0 auto;
    transform: translateY(-50px);
  }
  @media only screen and (max-width: 960px) {
    margin-bottom: 50px;
  }
  @media only screen and (max-width: 720px) {
    max-width: calc(90% - 32px);
  }
`
const Text = styled.h1`
  padding: 12px 1rem 0px 1.5rem;
  margin-bottom: -4px;
  width: 100%;
  max-width: 100%;
  color: #fff;
  font-weight: 500;
  font-size: 16px;
  opacity: 0.1;
`

const marquee = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translate(-100%); }
`

const Coins = styled.div`
  position: sticky;
  top: 0;
  width: 100vw;
  height: 30px;
  z-index: 100;
  display: flex;
  align-items: center;
  backdrop-filter: blur(20px);
  background: #0c0c0cb8;
  box-shadow: 0 0 10px inset #00000080;
  div {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    //animation: ${marquee} 30s linear infinite;
  }
  h2 {
    padding: 0;
    margin: 0;
    font-size: 14px;
    font-weight: 400;
    color: #fff;
  }
`
function TopLevelModals() {
  const open = useModalOpen(ApplicationModal.ADDRESS_CLAIM)
  const toggle = useToggleModal(ApplicationModal.ADDRESS_CLAIM)
  return <AddressClaimModal isOpen={open} onDismiss={toggle} />
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('/swap')
  const location = useLocation()
  useEffect(() => {
    setCurrentPage(location.pathname)
  }, [location.pathname])
  return (
    <Suspense fallback={null}>
      <Route component={GoogleAnalyticsReporter} />
      <Route component={DarkModeQueryParamReader} />
      <AppWrapper>
        <img src="https://i.ibb.co/2ZN5KSQ/IMG-5784-Moment.png" alt="" id="newbg" />
        <div className="backgroundVid">
          <video id="video" loop autoPlay muted>
            <source src="/images/sojo/bgvid.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <Coins>
          <div>
            <h2>CA: 0xf7573a62F3ffDf1e1d5E6A65436D84852FC83340</h2>
            {/* <h2>Coin2: $69.69</h2>
            <h2>Coin3: $69.69</h2> */}
          </div>
        </Coins>
        <URLWarning />
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>
        <BodyWrapper>
          <Popups />
          <Polling />
          <TopLevelModals />
          <Welcome>Welcome to Mars...</Welcome>
          <Web3ReactManager>
            <Switch>
              <Route exact strict path="/" component={Home} />
              <Route exact strict path="/swap" component={Swap} />
              <Route exact strict path="/claim" component={OpenClaimAddressModalAndRedirectToSwap} />
              <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
              <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
              <Route exact strict path="/find" component={PoolFinder} />
              <Route exact strict path="/pool" component={Pool} />
              <Route exact strict path="/uni" component={Earn} />
              <Route exact strict path="/vote" component={Vote} />
              <Route exact strict path="/create" component={RedirectToAddLiquidity} />
              <Route exact strict path="/disperse" component={Disperse} />
              <Route exact path="/add" component={AddLiquidity} />
              <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
              <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
              <Route exact path="/create" component={AddLiquidity} />
              <Route exact path="/create/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
              <Route exact path="/create/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
              <Route exact strict path="/remove/v1/:address" component={RemoveV1Exchange} />
              <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />
              <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />
              <Route exact strict path="/migrate/v1" component={MigrateV1} />
              <Route exact strict path="/migrate/v1/:address" component={MigrateV1Exchange} />
              <Route exact strict path="/uni/:currencyIdA/:currencyIdB" component={Manage} />
              <Route exact strict path="/vote/:id" component={VotePage} />
              <Route component={RedirectPathToSwapOnly} />
            </Switch>
          </Web3ReactManager>
          <Marginer />
        </BodyWrapper>
        <MarsWeather />
        {currentPage === '/swap' ? (
          <Trading>
            <h2>Coming Soon...</h2>
            <Text>Live Trades</Text>
          </Trading>
        ) : null}
      </AppWrapper>
    </Suspense>
  )
}
