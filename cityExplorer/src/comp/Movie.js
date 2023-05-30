function Movie(props){
    let movieHtml =  props.movieData.map(function(element){
        return <>
          <h1>{element.original_title}</h1>
        </>
      })

      return movieHtml
}

export default Movie