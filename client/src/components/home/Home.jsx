import React from 'react';
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer, MDBBtn } from 'mdbreact';

const routeTypes = {
    CHARACTERS: 0,
    WEAPONS: 1,
    SPACESHIPS: 2,
    PLANETS: 3,
    MOVIES: 4
};

const Home = ({ history }) => {
    const redirect = (routeType) => {
        if (routeType === routeTypes.CHARACTERS) {
            history.push('/characters');
        } else if (routeType === routeTypes.WEAPONS) {
            history.push('/weapons');
        } else if (routeType === routeTypes.SPACESHIPS) {
            history.push('/spaceships');
        } else if (routeType === routeTypes.PLANETS) {
            history.push('/planets');
        } else if (routeType === routeTypes.MOVIES) {
            history.push('/movies');
        }
    };
    
    return (
        <MDBContainer>
            <h4 className="mt-5 mb-2"></h4>
            <MDBCarousel activeItem={1} length={5} showControls={true} showIndicators={true} className="z-depth-1">
                <MDBCarouselInner>
                    <MDBCarouselItem itemId="1">
                        <MDBView>
                            <img className="d-block w-100" src="https://images-na.ssl-images-amazon.com/images/I/81QmkL1guOL._SL1500_.jpg" alt="First slide" />
                            <MDBMask overlay="black-light" />
                        </MDBView>
                        <MDBCarouselCaption>
                            <h3 className="h3-responsive">Characters</h3>
                            <MDBBtn color="primary" onClick={() => redirect(routeTypes.CHARACTERS)}>Go to characters</MDBBtn>
                        </MDBCarouselCaption>
                    </MDBCarouselItem>

                    <MDBCarouselItem itemId="2">
                        <MDBView>
                            <img className="d-block w-100" src="https://wallpaperplay.com/walls/full/b/7/1/217586.jpg" alt="Second slide" />
                            <MDBMask overlay="black-light" />
                        </MDBView>
                        <MDBCarouselCaption>
                            <h3 className="h3-responsive">Weapons</h3>
                            <MDBBtn color="primary" onClick={() => redirect(routeTypes.WEAPONS)}>Go to weapons</MDBBtn>
                        </MDBCarouselCaption>
                    </MDBCarouselItem>

                    <MDBCarouselItem itemId="3">
                        <MDBView>
                            <img className="d-block w-100" src="https://i.pinimg.com/originals/2e/d9/74/2ed9749ee76e5a96237300c81bcb0c24.jpg" alt="Third slide" />
                            <MDBMask overlay="black-light" />
                        </MDBView>
                        <MDBCarouselCaption>
                            <h3 className="h3-responsive">Spaceships</h3>
                            <MDBBtn color="primary" onClick={() => redirect(routeTypes.SPACESHIPS)}>Go to spaceships</MDBBtn>
                        </MDBCarouselCaption>
                    </MDBCarouselItem>

                    <MDBCarouselItem itemId="4">
                        <MDBView>
                            <img className="d-block w-100" src="https://i.imgur.com/eC1Enl8.jpg?2?fb" alt="Forth slide" />
                            <MDBMask overlay="black-light" />
                        </MDBView>
                        <MDBCarouselCaption>
                            <h3 className="h3-responsive">Planets</h3>
                            <MDBBtn color="primary" onClick={() => redirect(routeTypes.PLANETS)}>Go to planets</MDBBtn>
                        </MDBCarouselCaption>
                    </MDBCarouselItem>

                    <MDBCarouselItem itemId="5">
                        <MDBView>
                            <img className="d-block w-100" src="http://ngradio.gr/wp-content/uploads/2016/01/Star-Wars_0.jpg" alt="Fifth slide" />
                            <MDBMask overlay="black-light" />
                        </MDBView>
                        <MDBCarouselCaption>
                            <h3 className="h3-responsive">Movies</h3>
                            <MDBBtn color="primary" onClick={() => redirect(routeTypes.MOVIES)}>Go to movies</MDBBtn>
                        </MDBCarouselCaption>
                    </MDBCarouselItem>
                </MDBCarouselInner>
            </MDBCarousel>
        </MDBContainer>
    );
};

export default Home;
