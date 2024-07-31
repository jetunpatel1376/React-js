import React, { useState } from "react";
import { useForm } from "react-hook-form";

function Form() {
  const [name, setName] = useState({ firstname: "", lastname: "" });

  function handleSubmit(e) {
    e.preventDefault();
    console.log(name);
  }
  return (
    <>
      <div>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <label htmlFor="fname">First Name:</label>
          <input
            type="text"
            placeholder="Enter Your First Name"
            name="fname"
            value={name.firstname}
            onChange={(e) => setName({ ...name, firstname: e.target.value })}
          />
          <label htmlFor="lname">Last Name:</label>
          <input
            type="text"
            placeholder="Enter Your Last Name"
            name="lname"
            value={name.lastname}
            onChange={(e) => setName({ ...name, lastname: e.target.value })}
          />
          <label htmlFor="number">Mobile No:</label>
          <input type="number" name="number" id="number" />
          <button>Submit</button>
        </form>
      </div>
    </>
  );
}

export default Form;
