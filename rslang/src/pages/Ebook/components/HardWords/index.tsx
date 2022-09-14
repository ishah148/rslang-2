import React, { useEffect, useLayoutEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { IUserAggregatedWordsResponce } from "../../../../services/api/AggregatedWords"
import WordDifficult from "../WordDifficult/WordDifficult"

function HardWords({ wordsToShow }: { wordsToShow: IUserAggregatedWordsResponce }) {
  const [wordsCount, setWordsCount] = useState(wordsToShow[0].paginatedResults.length)

  return (
    <>
      {wordsCount > 0 ? (
        <div>
          {wordsToShow?.[0]?.paginatedResults?.map((elem) => {
            return <WordDifficult key={elem._id} dataWord={elem} setWordsCount={setWordsCount} />
          })}
        </div>
      ) : (
        <h1>Your list of difficult words is empty</h1>
      )}
    </>
  )
}

export default HardWords
