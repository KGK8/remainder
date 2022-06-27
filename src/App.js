import axios from "axios";
import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPen, FaTrash } from "react-icons/fa";
import moment from "moment";
const App = () => {
  const formValues = {
    emailId: "",
    phone: "",
    title: "",
    message: "",
    hour: "",
    minutes: "",
    date: "",
    id: "",
  };
  const [formData, setFormData] = useState(formValues);
  const [getRemainders, setGetRemainders] = useState();
  const [edit, setEdit] = useState();
  const [show, setShow] = useState("d-none");
  const [dateUpdated, setDeleteUpdated] = useState("true");
  const [errorMessage, setErrorMessage] = useState("");

  const clearForm = () => {
    formData.emailId = "";
    formData.phone = "";
    formData.title = "";
    formData.message = "";
    formData.hour = "";
    formData.minutes = "";
    formData.date = "";
    formData.id = "";
  };
  useEffect(() => {
    axios.get(`https://agile-wildwood-85313.herokuapp.com/addremainder`).then((res) => {
      // setDeleteUpdated("0");
      return setGetRemainders(res.data);
    });
  }, [dateUpdated]);
  console.log(getRemainders);
  const remainderHandler = (e) => {
    setErrorMessage("");
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sumbitRemainder = () => {
    console.log(formData);
    setErrorMessage("");
    var apiBody = {
      emailId: formData.emailId,
      phone: formData.phone,
      title: formData.title,
      message: formData.message,
      sendTimer: new Date(
        `${formData.date} ${formData.hour}:${formData.minutes}:00`
      ),
    };
    axios
      .post(`https://agile-wildwood-85313.herokuapp.com/addremainder`, apiBody)
      .then((res) => {
        console.log(res);
        setDeleteUpdated(res.data.userId);
        toast.success("Remainder Added Successfully", {
          position: "top-right",
          autoClose: 800,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return clearForm();
      })
      .catch((err) => {
        console.log(err.message);
        setErrorMessage(err.response.data.error);
      });
  };
  const editData = (data) => {
    setShow("showUp");
    setEdit(data);
    console.log(data.sendTimer);
    console.log(data.sendTimer.split("T")[1].split(":")[0]);
    setFormData({
      ...formData,
      emailId: data.emailId,
      phone: data.phone,
      title: data.title,
      message: data.message,
      date: data.sendTimer.split("T")[0],
      hour: data.sendTimer.split("T")[1].split(":")[0],
      minutes: data.sendTimer.split("T")[1].split(":")[1],
    });
  };
  const updateHandler = (data) => {
    var apiBody = {
      emailId: formData.emailId,
      phone: formData.phone,
      title: formData.title,
      message: formData.message,
      sendTimer: new Date(
        `${formData.date} ${formData.hour}:${formData.minutes}:00`
      ),
    };
    axios
      .put(`https://agile-wildwood-85313.herokuapp.com/addremainder/${edit._id}`, apiBody)
      .then((res) => {
        console.log(res);
        setDeleteUpdated(edit._id);
        toast.success("Remainder Updated Successfully", {
          position: "top-right",
          autoClose: 800,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return clearForm();
      });
  };
  const deleteHandler = (id) => {
    axios.delete(`https://agile-wildwood-85313.herokuapp.com/addremainder/${id}`).then((res) => {
      console.log(res);
      setDeleteUpdated(10);
    });
  };
  return (
    <div className="containerRem">
      <div className="formContainer">
        <Form>
          <FormGroup>
            <Label for="exampleEmail">EmailId</Label>
            <Input
              type="email"
              name="emailId"
              id="exampleEmail"
              placeholder="Email Id"
              value={formData.emailId}
              onChange={remainderHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Phone</Label>
            <Input
              type="number"
              name="phone"
              id="exampleEmail"
              placeholder="phone"
              value={formData.phone}
              onChange={remainderHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Title</Label>
            <Input
              type="text"
              name="title"
              id="exampleEmail"
              placeholder="Title"
              value={formData.title}
              onChange={remainderHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleText">Message</Label>
            <Input
              type="textarea"
              name="message"
              id="exampleText"
              value={formData.message}
              onChange={remainderHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Notification Date</Label>
            <Input
              type="date"
              name="date"
              id="examplePassword"
              value={formData.date}
              onChange={remainderHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleSelect">Notification Time</Label>
            <br />
            <Input
              type="select"
              name="hour"
              id="timeInput"
              value={formData.hour}
              onChange={remainderHandler}
            >
              <option>Hours</option>
              <option>01</option>
              <option>02</option>
              <option>03</option>
              <option>04</option>
              <option>05</option>
              <option>06</option>
              <option>07</option>
              <option>08</option>
              <option>09</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
              <option>13</option>
              <option>14</option>
            </Input>
            <Input
              type="select"
              name="minutes"
              id="timeInput"
              value={formData.minutes}
              onChange={remainderHandler}
            >
              <option>Minutes</option>
              <option>01</option>
              <option>02</option>
              <option>03</option>
              <option>04</option>
              <option>05</option>
              <option>06</option>
              <option>07</option>
              <option>08</option>
              <option>09</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
              <option>13</option>
              <option>14</option>
              <option>15</option>
              <option>16</option>
              <option>17</option>
              <option>18</option>
              <option>19</option>
              <option>20</option>
              <option>21</option>
              <option>22</option>
              <option>23</option>
              <option>24</option>
              <option>25</option>
              <option>26</option>
              <option>27</option>
              <option>28</option>
              <option>29</option>
              <option>30</option>
              <option>31</option>
              <option>32</option>
              <option>33</option>
              <option>34</option>
              <option>35</option>
              <option>36</option>
              <option>37</option>
              <option>38</option>
              <option>39</option>
              <option>30</option>
              <option>31</option>
              <option>32</option>
              <option>33</option>
              <option>34</option>
              <option>35</option>
              <option>36</option>
              <option>37</option>
              <option>38</option>
              <option>39</option>
              <option>40</option>
              <option>41</option>
              <option>42</option>
              <option>43</option>
              <option>44</option>
              <option>45</option>
              <option>46</option>
              <option>47</option>
              <option>48</option>
              <option>49</option>
              <option>50</option>
              <option>51</option>
              <option>52</option>
              <option>53</option>
              <option>54</option>
              <option>55</option>
              <option>56</option>
              <option>57</option>
              <option>58</option>
              <option>59</option>
              <option>60</option>
            </Input>
          </FormGroup>
          <Button onClick={() => sumbitRemainder()} className="btn-success">
            Submit
          </Button>
          <Button onClick={() => updateHandler()} className={show}>
            Update
          </Button>
          <p className="errorMsg">{errorMessage}</p>
        </Form>
      </div>
      <div className="appendData">
        <table className="table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Title</th>
              <th>Message</th>
              <th>Remainds In</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {getRemainders?.map((res, count) => {
              return [
                <tr key={count}>
                  <td>{count + 1}</td>
                  <td>{res.emailId}</td>
                  <td>{res.phone}</td>
                  <td>{res.title}</td>
                  <td>{res.message}</td>
                  <td>{moment(res.sendTimer).fromNow()}</td>
                  <td>
                    <button className="editPen" onClick={() => editData(res)}>
                      {<FaPen />}
                    </button>
                  </td>
                  <td>
                    <button
                      className="editPen"
                      onClick={() => deleteHandler(res._id)}
                    >
                      {<FaTrash />}
                    </button>
                  </td>
                </tr>,
              ];
            })}
          </tbody>
        </table>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
};

export default App;
