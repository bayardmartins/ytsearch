import React, {useState} from 'react';

import api from '../../services/api';

export default function Query() {
    const [terms, setTerms] = useState('');
    const [sunday, setSunday] = useState(''); 
    const [monday, setMonday] = useState(''); 
    const [tuesday, setTuesday] = useState(''); 
    const [wednesday, setWednesday] = useState(''); 
    const [thursday, setThursday] = useState(''); 
    const [friday, setFriday] = useState(''); 
    const [saturday, setSaturday] = useState('');
    let [keyWords, setKeyWords] = useState('');
    let [totalTime, setTotalTime] = useState('');

    async function handleSearch(e) {
        e.preventDefault();

        try{
            const response = await api.get('search', { params: {
                terms,
                sunday,
                monday,
                tuesday,
                wednesday,
                thursday,
                friday,
                saturday,
            } });
            setResponse(response);
        }catch (err) {
            if(err.response.status === 500){
                alert('Input inválido, verifique dados informados');
            }else{
                alert('Erro ao pesquisar. Tente novamente.');
            }
        }
    }

    function setResponse(apiReturn){
        setKeyWords(arrangeKeyWords(apiReturn.data["keyWords"]));
        setTotalTime(apiReturn.data["totalTime"]);
    }

    function arrangeKeyWords(data){
        return data.map(a => a + " ");
    }

    return (
        <div className="new-search-container">
            <div className="content">    
                <section>
                    <h1>Pesquisar vídeo</h1>
                </section>

                <form onSubmit={handleSearch}>
                    <input placeholder="Palavras-chave" 
                    value={terms}
                    onChange={e => setTerms(e.target.value)}
                    />
                    <section>
                        <p>Preencha em minutos o tempo disponível por dia da semana</p>
                    </section>
                    <li>    
                        <textarea placeholder="Dom" 
                        value={sunday}
                        onChange={e => setSunday(e.target.value)}
                        />
                        <textarea placeholder="Seg" 
                        value={monday}
                        onChange={e => setMonday(e.target.value)}
                        />
                        <textarea placeholder="Ter" 
                        value={tuesday}
                        onChange={e => setTuesday(e.target.value)}
                        />
                        <textarea placeholder="Qua" 
                        value={wednesday}
                        onChange={e => setWednesday(e.target.value)}
                        />
                        <textarea placeholder="Qui" 
                        value={thursday}
                        onChange={e => setThursday(e.target.value)}
                        />
                        <textarea placeholder="Sex" 
                        value={friday}
                        onChange={e => setFriday(e.target.value)}
                        />
                        <textarea placeholder="Sáb" 
                        value={saturday}
                        onChange={e => setSaturday(e.target.value)}
                        />
                    </li>
                    <button className="button" type="submit">Pesquisar</button>
                </form>

                <section>
                    <h1 className="h1">As 5 palavras mais utilizadas no título e descrição foram:</h1>
                    <h2 className="h2">{keyWords}</h2>
                </section>
                <section>
                    <h1 className="h1">O total de dias necessários para assistir todos os vídeos é:</h1>
                    <h2 className="h2">{totalTime}</h2>
                </section>

            </div>
        </div>
    );
}