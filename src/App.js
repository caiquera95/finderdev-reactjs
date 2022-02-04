import React, {useEffect, useState} from 'react';

import './App.css';
import {BsTwitter} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {FiLink, FiSearch} from 'react-icons/fi'
import {BiBuildings} from 'react-icons/bi'

import moment from 'moment';


export default function Main(){
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [followers, setFollowers] = useState('');
    const [following, setFollowing] = useState('');
    const [repos, setRepos] = useState('');
    const [avatar, setAvatar] = useState('');
    const [userInput, setUserInput] = useState('');

    const [darkMode, setDarkMode] = useState(false);

    const [location, setLocation] = useState('');
    const [twitter, setTwitter] = useState('');
    const [link, setLink] = useState('');
    const [company, setCompany] = useState('');
    const [date, setDate] = useState('');
    const [bio, setBio] = useState('');
    const [error, setError] = useState(null)

    moment.locale("pt-BR");

    useEffect (() => {
        fetch('https://api.github.com/users/example')
        .then(res => res.json())
        .then(data => {
            setData(data);
        })
    }, []);

    const setData = ({
        name, login, followers, 
        following, public_repos, avatar_url,
        location,twitter_username, 
        html_url,company, created_at, bio
    }
        ) => {
        setName(name);
        setUserName(login);
        setFollowers(followers);
        setFollowing(following);
        setRepos(public_repos);
        setAvatar(avatar_url);
        setLocation(location)
        setTwitter(twitter_username)
        setLink(html_url)
        setCompany(company)
        setDate(created_at)
        setBio(bio)
    }

    const handleSearch = e => {
        e.preventDefault()
        setUserInput(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch(`https://api.github.com/users/${userInput}`)
        .then(res => res.json())
        .then( data => {
            if (data.message) {
                setError(data.message);

            } else {
                    setData(data)
                    setError(null)

                }
        });
    };

    return(
        <>

    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
        <div className="App">
            <div className="switch-checkbox">
                <span>{darkMode ? "Dark" : "Light"}</span>
                <label className="switch">
                    <input type="checkbox" onChange={() => setDarkMode(!darkMode)} />
                    <span className="slider round"> </span>
                </label>
            </div>

        <div className='container'>
        <form onSubmit={handleSubmit}>

                <div className='boxSearch'>
                    <FiSearch />
                    <input type='text'
                    placeholder='Search GitHub username...'
                    value={userInput}
                    onChange={handleSearch}
                    />

                    <button>
                        Buscar
                    </button>
                </div>

            </form>

            {error ? (
            <div className='boxDetails'>
                    <div className='boxInfos'>
                        <div className='textsNotFound'>
                            <p>Não existe nenhum Dev com esse Username</p>
                        </div>
                    </div>
            </div> 
            ) : (
            <div className='boxDetails'>
                                <img src={avatar}/>
                                <div className='boxInfos'>
                                    <div className='texts'>
                                    {name !== null ? <span>{name}</span> : <span>Sem Nome</span>}
                                        <p> Ingressou {moment(date).format('DD/MM/YYYY')}</p>
                                    </div>
                                        <div className='infos2'>
                                            <h2>@{userName}</h2>
                                            {bio !== null ? <h4>{bio}</h4> : <h4>Sem descrição na Bio</h4>}

                                            <div className='boxRepo'>
                                                <div>
                                                    <p>Repos</p>
                                                    <span>{repos}</span>
                                                </div>

                                                <div>
                                                    <p>Followers</p>
                                                    <span>{followers}</span>
                                                </div>

                                                <div>
                                                    <p>Following</p>
                                                    <span>{following}</span>
                                                </div>
                                            </div>

                                            <div className='boxAbout'>

                                                <ul>
                                                    <li>
                                                        <MdLocationOn />
                                                        {location !== null ? <p>{location}</p> : <p>Sem informação</p>}
                                                    </li>

                                                    <li>
                                                        <FiLink />
                                                        {link !== null ? <a href={link}>GitHub</a> : <p>Sem informação</p>}
                                                    </li>

                                                    <li>
                                                        <BsTwitter />
                                                        {twitter !== null ? <p>{twitter}</p> : <p>Sem informação</p>}
                                                    </li>

                                                    <li>
                                                        <BiBuildings />
                                                        {company !== null ? <p>{company}</p> : <p>Sem informação</p>}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                </div>
            </div>
            )}
            </div>
        </div>
    </div>

    </>
  );
}

