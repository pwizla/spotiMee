import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import './App.css'
import SpotifyWebApi from 'spotify-web-api-js'
const spotifyApi = new SpotifyWebApi()
const BASE_WEB_PLAYER_URL = "https://open.spotify.com"
const LOGIN_URI = process.env.REACT_APP_LOGIN_URI || 'http://localhost:9000/.netlify/functions/server/login'

function TopArtists ({ artists }) {
  return (
    <div className="top-artists">
      <TopArtistsList artists={artists}/>
    </div>
  )
}

function TopArtistsList ({ artists }) {
  return (
    <>
      <div className="artists-list-container">
        <h2 className="text--center uppercase font-size--36">Your Favorite Artists</h2>
        <p><RatherSee text="your favorite tracks" link="/tracks" /></p>
        <ul className="flex-list flex-list--full-screen">
          { artists.map((artist) => (
            <ArtistCard artist={artist} key={artist.id}/>
          ))}
        </ul>
      </div>
    </>
  )
}

function ArtistCard( { artist, expandable }) {
  return (
    <Link className="link link--card" to={`/artists/${artist.id}`}>
      <li className={`card card--wide card--animated ${expandable ? 'card--expandable' : ''}`}>
        {(artist.images && artist.images.length > 0) && (
          <div className="avatar-wrapper">
            <img
              className="avatar"
              alt={`avatar for ${artist.name}`}
              src={artist.images[0].url}
            />
          </div>
        )}
        <div className={`artist-details padding ${!artist.images || artist.images.length === 0 ? 'artist-details--placeholder' : ''}`}>
          <span><span className="header header--artist-card link--green-hover">{artist.name}</span></span>
        </div>
      </li>
    </Link>
  )
}

function RatherSee ({ text, link }) {
  return (
    <>
      <p className="text--small text--center margin--bottom-3">Rather see <Link to={link} className="link link--green-underline">{text}</Link>?</p>
    </>
  )
}

function TopTracks ({ tracks }) {
  return (
    <div className="top-tracks">
      <TopTracksList tracks={tracks}/>
    </div>
  )
}

function TopTracksList ({ tracks }) {
  return (
    <>
      <div className="artists-list-container">
        <h2 className="uppercase font-size--36 text--center">Your Favorite Tracks</h2>
        <RatherSee text="your favorite artists" link="/artists" />
        <ul className="">
          { tracks.map((track, index) => (
            <TrackCard track={track} key={track.id} index={index}/>
          ))}
        </ul>
      </div>
    </>
  )
}

function TrackCard( { track, index }) {
  return (
    <li className="card--track"
      style={{
        'listStyleType': 'none',
        'display': 'flex',
        'marginBottom': '40px'
    }}>
      <div className="track-cover"
        style={{
          'borderRadius': '50%',
          'flexBasis': '80px',
          'maxWidth': '80px',
          'minWidth': '80px',
          'height': '80px',
          'flex': '1 0 auto',
          'backgroundImage': `url(${track.album.images[0].url})`,
          'backgroundPosition': 'center',
          'position': 'relative'
        }}>
        <div className="play"
          style={{
            'width': '0', 
            'height': '0', 
            'borderTop': '13px solid transparent',
            'borderBottom': '13px solid transparent', 
            'borderLeft': '22px solid #FFF', 
            'position': 'absolute',
            'zIndex': 3,
            'top': '28px',
            'left': '30px'
          }}>
        </div>
        <div className="play"
          style={{
            'width': '0', 
            'height': '0', 
            'borderTop': '28px solid transparent',
            'borderBottom': '28px solid transparent', 
            'borderLeft': '46px solid #1DB954', 
            'position': 'absolute',
            'zIndex': 2,
            'top': '13px',
            'left': '21px'
          }}>
        </div>
        <div className="play"
          style={{
            'width': '0', 
            'height': '0', 
            'borderTop': '31px solid transparent',
            'borderBottom': '31px solid transparent', 
            'borderLeft': '51px solid #FFF', 
            'position': 'absolute',
            'zIndex': 1,
            'top': '10px',
            'left': '20px'
          }}>
        </div>
      </div>
      <div className="track-data"
        style={{
          'color': '#000',
          'marginLeft': '20px',
          'textAlign': 'left',
          'display': 'flex',
          'flexDirection': 'column',
          'justifyContent': 'flex-start',
          'alignItems': 'flex-start',
          'position': 'relative',
          'paddingTop': '0',
          'paddingLeft': '110px',
        }}>
        <div style={{
          'color': '#1DB954',
          'fontSize': '108px',
          'fontFamily': "'Anonymous Pro', monospace",
          'letterSpacing': index < 9 || index > 18 ? '-5px' : '-15px',
          'opacity': .1,
          'position': 'absolute',
          'top': '-14px',
          'left': '16px',
          'zIndex': -1,
          'fontWeight': 'bold',
          'textAlign': 'right'
        }}>
          {index < 9 ? `0${index + 1}` : index + 1}
        </div>
        <a
          className="link header"
          style={{'paddingTop': '10px'}}
          href={`${BASE_WEB_PLAYER_URL}/track/${track.id}`}>
          <span className="link--green-hover">{track.name}</span>
        </a>
        <div
          style={{
            'display': 'block',
            'fontWeight': 300
          }}
          className=""
          href={`${BASE_WEB_PLAYER_URL}/track/${track.id}`}>
          {track.artists.reduce((artistsArray, currentArtist) => {
            artistsArray.push({
              name: currentArtist.name ? currentArtist.name : '',
              url: currentArtist.external_urls.length > 0 ? currentArtist.external_urls.spotify : '',
              id: currentArtist.id ? currentArtist.id : ''
            })
            return artistsArray
          }, []).map((artist) => (
            <Link to={`/artists/${artist.id}`}
              className="link--green-hover"
              href={artist.url}
              style={{
                'margin-right': '10px',
                'textDecoration': 'none',
                'color': 'inherit'
              }}>
                {artist.name}
            </Link>
          ))}
        </div>
      </div>
    </li>
  )
}

const Home = () => (
  <div className="height--full">
    <h2 className="text--center above">What do you want to look at?</h2>
    <div className="height--100">
      <div className="width--50 height--100 pos--rel float--left hover--bg-black hover--color-white transition--fast">
        <Link
          className="link route-link bold width--100 height--100"
          to="/artists">
          <div className="center--both bold pos--abs">
            <span className="link--green-hover">My Top Artists</span>
          </div>
        </Link>
      </div>
      <div className="width--50 height--100 pos--rel float--right hover--bg-green hover--color-white transition--fast">
        <Link
          className="link route-link bold width--100 height--100"
          to="/tracks">
          <div className="center--both pos--abs">
            <span className="link--black-hover">
              My Top Tracks
            </span>
          </div>
        </Link>
      </div>
    </div>
  </div>
)

class AlbumCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imageLoaded: false
    }
    this.maybeTruncate = this.maybeTruncate.bind(this)
  }
  maybeTruncate(string, maxChar = 70) {
    return string.length > maxChar ? string.substring(0, maxChar) + '…' : string
  }
  render() {
    const { name, images, release_date, external_urls: {spotify: url }} = this.props
    const { imageLoaded } = this.state
    const date = new Date(release_date);
    const year = date.getFullYear();

    return (
      <>
        {(images && images.length > 0) && (
          <div className={`album-card ${imageLoaded ? 'loaded' : ''}`}>
            <img
              className="album-cover"
              src={images[1].url}
              alt={name}
              onLoad={() => this.setState({imageLoaded: true})}
            />
            <div className="album-details">
              <a href={url} target="_blank" rel="noopener noreferrer">{this.maybeTruncate(name)}</a>
              <div className="year">({year})</div>
            </div>
          </div>
        )}
      </>
    )
  }
}

class ArtistDetails extends React.Component {
  constructor(props) {
    super(props)
    this.getArtist = this.getArtist.bind(this)
    this.getArtistAlbums = this.getArtistAlbums.bind(this)
    this.filterArtistAlbums = this.filterArtistAlbums.bind(this)

    this.state = {
      artist: {},
      albums: {},
      related: {}
    }
  }
  componentDidMount() {
    this.getArtist(this.props.match.params.id)
    this.getArtistAlbums(this.props.match.params.id)
    this.getRelatedArtists(this.props.match.params.id)
  }
  getArtist(id) {
    spotifyApi.getArtist(id)
      .then(data => this.setState({ artist: data}))
  }
  getArtistAlbums(artistId) {
    spotifyApi.getArtistAlbums(artistId, {limit: 50, country: 'FR'})
      .then(data => this.setState({ albums: { fullList: data.items }}))
      .then(() => this.filterArtistAlbums())
  }
  filterArtistAlbums() {
    const albumsByType = this.state.albums.fullList.reduce((accumulator, item) => {
      if (!accumulator[item.album_group]) {
        accumulator[item.album_group] = [];
      }

      accumulator[item.album_group].push(item)
      return accumulator
    }, {})
    this.setState({ albums: {...this.state.albums, byType: albumsByType }})
  }
  beautifyType(type) {
    let beautified;
    switch (type) {
      case 'album':
        beautified =  'Albums'
        break
      case 'single':
        beautified = 'Singles'
        break
      case 'appears_on':
        beautified =  'Other Appearances'
        break
      case 'compilation':
        beautified = 'Compilations'
        break
      default:
        beautified = type
    }
    return beautified
  }

  getRelatedArtists(artistId) {
    spotifyApi.getArtistRelatedArtists(artistId)
      .then(data => this.setState({ related: data.artists }))
  }
  render() {
    const { name, genres, id, images } = this.state.artist
    const { albums: { byType }, related } = this.state

    return (
      <div className="page page--two-columns">
        <section className="column column--full-height artist-summary">
          {(images && images.length > 0) && (<div className="artist-image square--320"
            style={{ 'background-image': `url(${images[0].url})`}}>
          </div>
          )}
          <h1 className="header--artist-details flex-can-grow">
            <a
              className="link link--green-hover"
              href={`${BASE_WEB_PLAYER_URL}/artist/${id}`}>
              {name}
            </a>
          </h1>
          {genres && genres.length > 0
            ? (
              <div className="genres">
                <h2 className="page-details-subheader">Genres</h2>
                <span className="">{genres.join(', ')}</span>
              </div>
            )
            : null
          }
        </section>

        <section className="column artist-releases">
          { !!byType && Object.keys(byType).map((type) => (
            <div className="page-details-section">
              <h2 className="subheader">{this.beautifyType(type)}</h2>
              <ul className="albums flex-list">
                { byType[type].map((album) => (
                  <AlbumCard {...album} />
                ))}
              </ul>
            </div>
          ))}
          { (related && related.length > 0) && (
            <div className="page-details-section">
              <h2 className="subheader">Related Artists</h2>
              <ul className="related flex-list">
                <div className="column--left">
                  { related.slice(0, 10).map((artist) => (
                    <ArtistCard artist={artist} expandable/>
                  ))}
                </div>
                <div className="column--right">
                { related.slice(10, 20).map((artist) => (
                  <ArtistCard artist={artist} expandable/>
                ))}
                </div>
              </ul>
            </div>
          )}
        </section>


      </div>
    )
  }
}

class App extends React.Component {
  constructor() {
    super()
    const params = this.getHashParams()
    const token = params.access_token
    if (token) {
      spotifyApi.setAccessToken(token)
    }
    this.state = {
      loggedIn: token ? true : false,
      topArtists: [],
      topTracks: [],
    }
    this.getTopArtists = this.getTopArtists.bind(this)
    this.getTopTracks = this.getTopTracks.bind(this)
  }
  componentDidMount() {
    this.getTopArtists();
    this.getTopTracks();
  }
  getHashParams() {
    var hashParams = {}
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q)
    }
    return hashParams
  }
  getTopArtists() {
    spotifyApi.getMyTopArtists({limit: 21})
      .then((response) => this.setState({ topArtists: response.items }))
  }
  getTopTracks() {
    spotifyApi.getMyTopTracks({limit: 20})
      .then((response) => this.setState({ topTracks: response.items }))
  }
  render() {
    const { loggedIn } = this.state

    return (
      <div className="App">
        { loggedIn === true
            ? <Router>
                <Route exact path="/" component={Home} />
                <Route exact path="/callback" render={() => (<Redirect to="/" />)} />
                <Route exact path="/artists" render={() => (<TopArtists artists={this.state.topArtists}/>)} />
                <Route exact path="/tracks" render={() => (<TopTracks tracks={this.state.topTracks}/>)} />
                <Route path="/artists/:id" render={(props) => (<ArtistDetails key={props.location.pathname} {...props} />)} />
              </Router>
            : ( <a href={LOGIN_URI}>Login to Spotify</a>)
        }
      </div>
    )
  }
}

export default App
