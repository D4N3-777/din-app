import { Card, Icon, Tooltip } from "antd";
import { Actions } from "easy-peasy";
import { default as React, useEffect, useState } from "react";
import { Waypoint } from "react-waypoint";
import { IRootState, useStoreActions, useStoreState } from "../../../Store";
import { Spinner } from "../../Shared/Spinner";
import { YoutubeModal } from "../../Shared/YoutubeModal";
import { ImdbIcon, PlexIcon } from "./Icons";

export const MoviesContainer: React.FC = (): JSX.Element => {
    const recentlyAddedMovies = useStoreState((state: IRootState) => state.movie.recentlyAddedMovies.items);
    const loading = useStoreState((state: IRootState) => state.movie.recentlyAddedMovies.loading);
    const ssr = useStoreState((state: IRootState) => state.movie.recentlyAddedMovies.ssr);
    const showYoutubeModal = useStoreState((state: IRootState) => state.components.recentlyAdded.showYoutubeModal);


    const getRecentlyAddedMovies = useStoreActions((actions: Actions<IRootState>) =>
        actions.movie.recentlyAddedMovies.getRecentlyAdded);
    const setShowYoutubeModal = useStoreActions((actions: Actions<IRootState>) =>
        actions.components.recentlyAdded.setShowYoutubeModal);
    const next = useStoreActions((actions: Actions<IRootState>) => actions.movie.recentlyAddedMovies.next);

    const [trailerId, setTrailerId] = useState<string>();

    useEffect(() => {
        if (recentlyAddedMovies.length <= 0 && !loading && !ssr) {
            getRecentlyAddedMovies();
        }
    }, []);

    const openYoutubeModal = (id: string): void => {
        setTrailerId(id);
        setShowYoutubeModal(true);
    };

    return (
        <>
            <YoutubeModal visible={showYoutubeModal} trailerId={trailerId}/>
            {recentlyAddedMovies.length > 0 ? (
                <>
                    {recentlyAddedMovies.map((item) => (
                        <Card
                            key={item[0].id}
                            className="container-item"
                            cover={
                                item[0].plexUrl ? (
                                    <Tooltip title="Open on Plex">
                                        <img
                                            className="card-img plex"
                                            alt=""
                                            src={`https://image.tmdb.org/t/p/w500/${item[1].posterPath}`}
                                            onClick={() => window.open(item[0].plexUrl)}
                                        />
                                    </Tooltip>
                                ) : (
                                    <Tooltip title="This movie has not been downloaded">
                                        <img
                                            className="card-img"
                                            alt=""
                                            src={`https://image.tmdb.org/t/p/w500/${item[1].posterPath}`}
                                        />
                                    </Tooltip>
                                )
                            }
                        >
                            <Card.Meta
                                title={item[0].title}
                                description={item[0].year}
                            />
                            <span
                                className="trailer-link"
                                onClick={() => openYoutubeModal(item[0].youtubeTrailerId)}
                            >
                                <Icon type="youtube" className="logo"/>
                                Trailer
                            </span>
                            {item[0].plexUrl ? (
                                <span
                                    className="plex-link"
                                    onClick={() => window.open(item[0].plexUrl)}
                                >
                                    <PlexIcon className="logo"/>
                                    Plex
                                </span>
                            ) : (
                                <span
                                    className="imdb-link"
                                    onClick={() => window.open(`https://imdb.com/title/${item[0].imdbId}`)}
                                >
                                    <ImdbIcon className="logo"/>
                                    IMDb
                                </span>
                            )}
                        </Card>
                    ))}
                    <div className="container-item">
                        {loading && (
                            <Spinner marginTop={0} marginBottom={10}/>
                        )}
                        <Waypoint horizontal={true} onEnter={() => next()}/>
                    </div>
                </>
            ) : (
                <Spinner/>
            )}
        </>
    );
};
