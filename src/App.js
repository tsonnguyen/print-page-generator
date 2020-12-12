/* eslint-disable no-undef */
import {useState,useEffect} from "react";
import './App.css';

function genPage(pages, slidePerPage = 4) {
    if (!slidePerPage) {
        return {
            front: '',
            back: ''
        }
    }

    const arrayResult = [];
    for (let i = 1; i <= pages; i += slidePerPage) {
        const right = (i+ slidePerPage - 1) > pages ? pages : i + slidePerPage - 1;
        if (i === right) {
            arrayResult.push(String(i))
        } else {
            arrayResult.push(String(i) + "-" + String(right));
        }
    }
    const front = [];
    const back = [];
    arrayResult.forEach((value, index) => {
        if (index % 2 === 0) {
            front.push(value);
        } else {
            back.push(value);
        }
    });
    return {
        front: front.join(","),
        back: back.join(","),
    };
}

function App() {
    const [totalPages, setTotalPages] = useState(0);
    const [slidesPerPage, setSlidePerPages] = useState(0);

    useEffect(() => {
        chrome.storage.local.get(['totalPages', 'slidesPerPage'], function(result) {
            setTotalPages(parseInt(result.totalPages));
            setSlidePerPages(parseInt(result.slidesPerPage));
        });
    }, [])

    const { front, back } = genPage(parseInt(totalPages), parseInt(slidesPerPage));

    return (
        <div className="App">
            <div><b>Print Page Generator</b></div>

            <input
                value={totalPages}
                onChange={e => {
                    setTotalPages(e.target.value)
                    chrome.storage.local.set({'totalPages': e.target.value});
                }}
                placeholder="Total Pages"
                type="number"
            />
            <input
                value={slidesPerPage}
                onChange={e => {
                    setSlidePerPages(e.target.value)
                    chrome.storage.local.set({'slidesPerPage': e.target.value});
                }}
                placeholder="Slides per Page"
                type="number"
            />

            <div>Front</div>
            <div>{front}</div>

            <div>Back</div>
            <div>{back}</div>
        </div>
    );
}

export default App;
