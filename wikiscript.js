async function doSub(event) {
    event.preventDefault();
    const inVal = document.querySelector('.js-search-input').value;
    const lookupSearch = inVal.trim();
    const javab = document.querySelector('.js-search-results');
    javab.innerHTML = '';
    const spinnie = document.querySelector('.js-spinner');
    spinnie.classList.remove('hidden');
    try {
      const resultz = await searchThruWikipedia(lookupSearch);
      if (resultz.query.searchinfo.totalhits === 0) {
        alert('No results found. Try different keywords');
        return;}
      showResults(resultz);
    } catch (error) {
      console.log(error);
      alert('Could not search through Wikipedia');
    } finally {
      spinnie.classList.add('hidden');
    }
  }
  async function searchThruWikipedia(lookupSearch) {
    const stop = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=youareelle&utf8=&format=json&origin=*&srlimit=1&srsearch=${lookupSearch}`;
    const rezp = await fetch(stop);
    if (!rezp.ok) {
      throw Error(rezp.statusText);}
    const json = await rezp.json();
    return json;
  }
  function showResults(resultz) {
    const javab = document.querySelector('.js-search-results');
    resultz.query.search.forEach(result => {
      const youareelle = `https://en.wikipedia.org/?curid=${result.pageid}`;
      javab.insertAdjacentHTML(
        'beforeend',
        `<div class="result-item">
          <h3 class="result-title">
            <a href="${youareelle}" target="_blank" rel="noopener">${result.title}</a>
          </h3>
          <a href="${youareelle}" class="result-link" target="_blank" rel="noopener">${youareelle}</a>
          <span class="result-snippet">${result.snippet}</span><br>
        </div>`
      );
    });
  }
  const form = document.querySelector('.js-search-form');
  form.addEventListener('submit', doSub);