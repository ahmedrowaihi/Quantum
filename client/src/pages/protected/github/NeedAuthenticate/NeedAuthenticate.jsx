import React, { useEffect } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '@services/github/actions';
import { CircularProgress } from '@mui/material';
import Button from '@components/general/Button';
import AnimatedMain from '@components/general/AnimatedMain';
import './NeedAuthenticate.css';

const NeedAuthenticate = () => {
    const { isLoading } = useSelector(state => state.github);
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if(user?.github?._id)
            navigate('/');
    }, [user]);

    return (isLoading) ? (
        <AnimatedMain id='Github-Need-Authenticate-Loading-Main'>
            <CircularProgress className='Circular-Progress' />
            <p>Connecting to your Github account...</p>
        </AnimatedMain>
    ) : (
        <AnimatedMain id='Github-Need-Authenticate-Main'>
            <section id='Github-Need-Authenticate-Body'>
                <article id='Github-Need-Authenticate-Title-Container'>
                    <h1 id='Github-Need-Authenticate-Title'>Let's start something new together...</h1>
                    <p id='Github-Need-Authenticate-Subtitle'>We will need you to authenticate using your Github account. We will gain access to your repositories to be able to deploy them.</p>
                </article>
        
                <article id='Github-Need-Authenticate-Body'>
                    <Button 
                        onClick={() => authenticate(user._id)}
                        title='Proceed to Github' 
                        variant='Contained Black Extend' 
                        icon={<BsArrowRight />} />
                </article>
            </section>
        </AnimatedMain>
    );
};

export default NeedAuthenticate;