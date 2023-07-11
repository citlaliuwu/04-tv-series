import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";


const Serie = () => {
  const [serie, setSerie] = useState();
  const [episodes, setEpisodes] = useState([]);
  const [cast, setCast] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState("");

  let params = useParams();

  useEffect(() => {
    fetchSerie(params.id);
    fetchSeasons(params.id);
    fetchCast(params.id);
  }, []);

  const fetchSerie = async (id) => {
    const res = await fetch(`https://api.tvmaze.com/shows/${id}`).then(
      (data) => data.json()
    );
    setSerie(res);
  };

  const fetchSeasons = async (id) => {
    const res = await fetch(`https://api.tvmaze.com/shows/${id}/seasons`).then(
      (data) => data.json()
    );
    setSeasons(res);
    if (res.length > 0) {
      setSelectedSeason(res[0].id);
      fetchEpisodes(res[0].id);
    }
  };

  const fetchEpisodes = async (seasonId) => {
    const res = await fetch(
      `https://api.tvmaze.com/seasons/${seasonId}/episodes`
    ).then((data) => data.json());
    setEpisodes(res);
  };

  const fetchCast = async (id) => {
    const res = await fetch(
      `https://api.tvmaze.com/shows/${id}/cast`
    ).then((data) => data.json());
    setCast(res);
  };

  const handleSeasonChange = (event) => {
    const selectedSeasonId = event.target.value;
    setSelectedSeason(selectedSeasonId);
    fetchEpisodes(selectedSeasonId);
  };

  return (
    <div>
      <div className="series-header">
        {serie && (
          <div className="series-header-container">
            <div className="series-header-image-container">
              <img
                src={serie.image.medium}
                className="series-header-image"
                alt={serie.name}
              />
            </div>
            <div className="series-header-summary-container">
              <h1 className="series-header-title custom-title">{serie.name}</h1>
              <div
                className="series-header-summary"
                dangerouslySetInnerHTML={{ __html: serie.summary }}
              ></div>
            </div>
          </div>
        )}
      </div>

      <div className="series-section">
        <h2>Temporadas</h2>
        {seasons.length > 0 ? (
          <div className="temporadas">
            {seasons.map((season) => (
              <button
                key={season.id}
                value={season.id}
                onClick={handleSeasonChange}
                className={selectedSeason === season.id ? "active" : ""}
              >
                Season {season.number}
              </button>
            ))}
          </div>
        ) : (
          <p>No seasons available</p>
        )}
      </div>

      <div className="series-section">
        <h2>Episodios</h2>
        {episodes.length > 0 ? (
          <ul>
            {episodes.map((episode) => (
              <li key={episode.id}>
                <Link to={`/episode/${episode.id}`}>{episode.name}</Link>
              </li>
            ))}
          </ul>
        ) : (
          episodes.length === 0 && <p>Loading episodes...</p>
        )}
      </div>

      <div className="series-section">
        <h2>CAST</h2>
        <div className="series-cast-container">
          <div className="series-cast">
            {cast.map((actor) => (
              <div key={actor.person.id} className="actor">
                {actor.person.image && (
                  <img
                    src={actor.person.image.medium}
                    className="actor-image"
                    alt={actor.person.name}
                  />
                )}
                <p className="actor-name">{actor.person.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Serie;
