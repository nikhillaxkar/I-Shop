import React, { useContext, useEffect, useState } from 'react'
import Container from '../../Components/Website/Container'
import { MainContext } from '../../Main';
import Slider from "react-slick";
import { getRandomDarkGradient } from '../../helper';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import ProductBox from "../../Components/Website/ProductBox";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { RxRows } from "react-icons/rx";

const Store = () => {
  const [category, setCategory] = useState([]); // correct
  const [product, setProduct] = useState([]);
  const [color, setColor] = useState([]);
  const { category_slug } = useParams();
  const [limit, setLimit] = useState(5);
  const [userColor, setUserColor] = useState(null);
  const [searchParams] = useSearchParams();

  const { setLoaderToggle, fetchCategory, fetchProduct, fetchColor } = useContext(MainContext);

  const getData = () => {

    fetchCategory()
      .then(
        (success) => {
          if (success.status == 1) {
            setCategory(success.data);
          } else {
            setCategory([]);
          }
        }
      ).catch(
        (error) => {

        }
      )


    fetchColor()
      .then(
        (success) => {
          if (success.status == 1) {
            setColor(success.data);
          } else {
            setColor([]);
          }
        }
      ).catch(
        (error) => {

        }
      )


  }

  useEffect(
    () => {
      setLoaderToggle(true);
      fetchProduct(limit, category_slug,userColor)
        .then(
          (success) => {
            if (success.status == 1) {
              setProduct(success.data);
            } else {
              setProduct([]);
            }
          }
        ).catch(
          (error) => {

          }
        ).finally(
          () => {
            setLoaderToggle(false)
          }
        )
    }, [limit, category_slug,userColor]
  )

  useEffect(
    getData,
    []
  )

  const udateSearchParams = () => {
    const urlQuery = new URLSearchParams({ limit });

    // If userColor is not null, add it to the URL query
    if (userColor !== null) {
      urlQuery.append("color", userColor);
    }

    // Update the URL with the new query parameters
    const currentURL = window.location.pathname;
    const newUrl = currentURL + "?" + urlQuery.toString();
    window.history.pushState({ path: newUrl }, '', newUrl);

    // Now that the URL has been updated, log the values
  }
  useEffect(() => {
    console.log("hi");
    const searchLimit = searchParams.get("limit");
    const searchColor = searchParams.get("color");
    if (searchLimit || searchColor != null) {
      if (searchLimit != null) setLimit(searchLimit);
      if (searchColor != null) setLimit(searchColor)

    }


    // Create URLSearchParams object with limit


  }, []);
  useEffect(

    udateSearchParams,
    [limit, userColor]
  )

  useEffect(
    () => {
      if (category_slug != undefined) {

      }
    },
    [category_slug]
  )


  return (
    <Container>
      <div className='grid grid-cols-4 gap-3 mt-2'>

        <div>
          <div className='py-3 bg-[#F6F7F8]'>
            <div className='text-[18px] p-3 font-bold uppercase'>Categories</div>
            <ul className='px-3'>
              {category.map((cat) => (
                <Link to={"/store/" + cat.slug} key={cat._id}> {/* Add key here */}
                  <li className='cursor-pointer'>{cat.name} ({cat.count})</li>
                </Link>
              ))}
            </ul>
          </div>
          <div className='py-3 bg-[#F6F7F8] mt-2'>
            <div className='text-[18px] p-3 font-bold uppercase'>Color</div>
            <ul className='px-3'>
              {
                color.map(
                  (c) => {
                    return <li onClick={() => setUserColor(c._id)} className={`flex items-center gap-4 cursor-pointer ${c._id == userColor ? 'font-bold' : ''}`} key={c._id}>
                      <span className='p-2' style={{ background: c.color }}></span>
                      {c.name}</li>
                  }
                )
              }
            </ul>
          </div>
        </div>
        <div className='col-span-3 border  p-3'>
          <CustomSlider data={category} />
          <ProductGrid limit={limit} data={product} limilHandler={(count) => {
            setLimit(count);
          }} />

        </div>
      </div>
    </Container>
  )
}

export default Store;

const ProductGrid = ({ data, limilHandler, limit }) => {
  const [grid, setGrid] = useState(true);

  useEffect(
    () => {
      const IsGrid = localStorage.getItem("grid");
      if (IsGrid != undefined) {
        IsGrid == 1 ? setGrid(true) : setGrid(false);
      }
    }, []
  )

  return (
    <div className='my-10'>
      <div className='my-3 p-3 bg-[#F6F7F8] flex gap-3 items-center '>
        <select value={limit} onChange={(e) => limilHandler(e.target.value)} name="" className='bg-transparent focus:outline-none border p-2' id="">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="0">ALL</option>
        </select>
        <div className='flex gap-3'>
          <BsFillGrid3X3GapFill fontSize={25} onClick={() => {
            setGrid(true)
            localStorage.setItem("grid", 1)
          }} color={grid ? '#2678BF' : 'black'} />
          <RxRows fontSize={25} onClick={() => {
            setGrid(false)
            localStorage.setItem("grid", 0)
          }} color={grid ? 'black' : '#2678BF'} />

        </div>
      </div>
      <div className={`${grid ? 'grid grid-cols-3 ' : ''} gap-3 `}>
        {
          data.map(
            (d) => {
              return <ProductBox key={d._id} grid={grid}   {...d} />
            }
          )
        }
      </div>
    </div>
  )
}

const CustomSlider = ({ data }) => {
  const cateBaseUrl = "http://localhost:5000/images/category/";
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 2000,
    pauseOnHover: true, // Pause autoplay on hover
    arrows: true, // Show arrows for manual navigation
    fade: false, // Set to true if you want fade transition instead of slide
    pauseOnFocus: true, // Pause autoplay on focus
    pauseOnDotsHover: true, 
  };
  return (
    <Slider {...settings}>
      {
        data.map(
          (d) => {
            return <div key={d._id} >
              <div style={{ background: getRandomDarkGradient() }}
                className='relative h-[300px]'>
                <div className='text-4xl text-white uppercase p-4 '
                  style={{ textShadow: "0px 0px 2px gray" }}>
                  {d.name}
                </div>
                <Link to={"/store/" + d.slug} >
                  <button className='border text-white m-4 p-3 hover:bg-black
                hover:border-black'> Show Now</button>
                </Link>

                <img src={cateBaseUrl + d.image} alt="" className='absolute bottom-0 right-0 w-[300px]' />
              </div>
            </div>
          }
        )
      }


    </Slider>
  );
}
