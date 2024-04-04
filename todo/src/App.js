import { useState, useEffect } from 'react';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import AddItems from './AddItems';
import SearchItem from './SearchItem';
import apiRequest from './apiRequest';
import DisplayPosts from './DisplayPosts';
// import ColorChange from './ColorChange';


function App() {
  const API_URL = 'http://localhost:3500/items';

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError, setFechError] = useState(null);
  const [isLoading, setIsLoading] =  useState(true);


  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response  = await fetch(API_URL);
        if (!response.ok) {
          throw Error('Error fetching data')
        }
        const lisItems = await response.json();
        console.log(lisItems);
        setItems(lisItems);
        setFechError(null)

      } catch (error) {
        setFechError(error.message)
      } finally {
        setIsLoading(false)
      }
    }
    
    setTimeout(() => {
      fetchItems()

    }, 2000)

  }, [])


  const addItem = async (item) => {
    const id = items.length ? parseInt(items[items.length - 1].id) + 1 : 1;
    const myNewItem = {id , checked: false, item};
    const listItems = [...items, myNewItem];
    setItems(listItems);

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'

      },
      body: JSON.stringify(myNewItem)
    }
    const result =  await apiRequest(API_URL, postOptions);
    if (result) setFechError(result);


  }

const handleCheck = async (id) => {
  const listItems = items.map((item) => item.id ===  id ? { ...item, checked: !item.checked } : item)
  console.log(`key: ${id}`)
  setItems(listItems);

  const myItem = listItems.filter(item => item.id === id);

  const updateOptions = {
    method: 'PATCH',
    header: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ checked: myItem[0].checked})
  }

  const reqUrl = `${API_URL}/${id}`;
  const result =  await apiRequest(reqUrl, updateOptions)
  if (result) setFechError(result);

}
//Delete fuction for removing an item from the list takes in an id as an argument

const handleDelete = async (id) => {
  const listItems = items.filter((item) => item.id !== id);
  setItems(listItems);

  const deleteOptions = {method: 'DELETE'};
  const reqUrl = `${API_URL}/${id}`;
  const result = await apiRequest(reqUrl, deleteOptions);
  if (result) setFechError(result);

}

const handleSubmit = (e) => {
  e.preventDefault();
  if (!newItem) return;
  addItem(newItem);
  setNewItem('')
  console.log('submitted');
}
  return (
    <div className="App">
      <Header title='Grocery List'/>
      <AddItems
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
       />
       <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <main>
        {isLoading && <p>Loading Items...</p>}
        {fetchError && <p style={{color: 'red'}}>{`error: ${fetchError} `}</p>}
        <Content 
          items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
      
          setItems={setItems}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
        
      </main>
     
      {/* <ColorChange /> */}
      <Footer length={items.length} />
      {/* <DisplayPosts /> */}
      
    </div>
  );
}

export default App;
