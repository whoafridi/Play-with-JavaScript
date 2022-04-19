import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import R from "../src/types/requests";
import { useForm } from "react-hook-form";

function App() {
  const [review, setReviews] = useState<R[]>([]);
  
  // data fetch
  useEffect(() => {
    // fetch("https://watchcom-server.herokuapp.com/review")
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));
    axios
      .get("https://watchcom-server.herokuapp.com/order")
      .then((response) => {
        console.log(response.data);
        setReviews(response.data);
      });
  }, []);

  const { register, handleSubmit, reset } = useForm();

  // handlesubmit using react-hook-form
  const onSubmit = (data: any): void => {
    console.log(data);
    axios
      .post("https://mighty-inlet-11453.herokuapp.com/services", data)
      .then((res) => {
        if (res.data.insertedId) {
          alert("added successfully");
          reset();
        }
        console.log(res.data);
      });
  };

  // delete an order
  const handleDeleteUser = (id: string): void => {
    const url = `https://watchcom-server.herokuapp.com/order/${id}`;
    axios.delete(url).then((res) => {
      const remainingProducts = review.filter((b) => b._id !== id);
      setReviews(remainingProducts);
      console.log(remainingProducts);
    });
  };

  //
  const [data, setData] = useState({
    servicename: "",
    description: "",
    price: "",
    img: "",
  });

  // handle change for bootstrap
  const handleChange = (e: any): void => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  // submit ofrm using bootstrap
  const handleSubmitForm = (e: any): void => {
    e.preventDefault();
    const userData = {
      servicename: data.servicename,
      description: data.description,
      price: data.price,
      img: data.img,
    };
    axios
      .post("https://mighty-inlet-11453.herokuapp.com/services", userData)
      .then((response) => {
        console.log(response);
        reset();
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("server responded");
        } else if (error.request) {
          console.log("network error");
        } else {
          console.log(error);
        }
      });
  };

  return (
    <div className="App">
      <Header />
      <Banner />
      {review.map((s) => {
        return (
          <ul>
            <li>{s.productname}</li>
            <li>
              <Button
                className="rounded-pill"
                variant="danger"
                onClick={() => handleDeleteUser(s._id)}
              >
                Delete
              </Button>
            </li>
          </ul>
        );
      })}
      <div className="add-service container w-50 me-auto">
        {/* using hook form  */}
        {/* <h2 className="text-center">Please Add a Service</h2>
            <h3 className="text-center">Only admin can add services</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("name", { required: true, maxLength: 20 })} placeholder="Service Name" />
                <textarea {...register("description")} placeholder="Description" />
                <input type="number" {...register("price")} placeholder="price" />
                <input {...register("img")} placeholder="image url" />
                <input type="submit" />                
            </form> */}
        {/* using basic bootstrap form  */}
        <Form onSubmit={handleSubmitForm}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>servicename</Form.Label>
            <Form.Control
              type="text"
              placeholder="servicename"
              name="servicename"
              value={data.servicename}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={data.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>price</Form.Label>
            <Form.Control
              type="number"
              placeholder="price"
              name="price"
              value={data.price}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Img url</Form.Label>
            <Form.Control
              type="text"
              placeholder="image url"
              name="img"
              value={data.img}
              onChange={handleChange}
            />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
