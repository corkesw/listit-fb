import React, { useContext, useState } from "react";
import { app, db } from "../../firebase";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate, useParams } from "react-router-dom";

const Create = () => {
  const { user, setUser } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [fields, setFields] = useState([
    ["", "text"],
    ["", "text"],
  ]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const { sessionId } = useParams();
  const navigate = useNavigate();

  console.log(fields[0]);

  // controlled component for title
  const titleChange = (e) => {
    setTitle(e.target.value);
  };
  // controlled component to update fields array
  const fieldChange = (e, index) => {
    setFields((currentFields) => {
      const updatedFields = [...currentFields];
      updatedFields[index][0] = e.target.value;
      return updatedFields;
    });
  };
  // adds an extra field if last answer field is tabbed away from or if 'add' button is clicked
  const addField = (index) => {
    setFields((currentFields) => {
      const updatedFields = [...currentFields];
      updatedFields.push(["", ""]);
      return updatedFields;
    });
  };
  // controlled component to set the data type
  const changeDataType = (e, index) => {
    setFields((currentFields) => {
      const updatedFields = [...currentFields];
      updatedFields[index][1] = e.target.value;
      return updatedFields;
    });
  };
  // removes the field at that index and closes the field
  const removeAnswer = (index) => {
    setAnswers((currentAnswers) => {
      const updatedAnswers = currentAnswers.filter((answer, i) => {
        return index !== i;
      });
      return updatedAnswers;
    });
    // updates the correct answers array to remove and renumber any indices as required
    setCorrectAnswers((currentAnswers) => {
      const removedCorrect = currentAnswers.filter((item) => {
        return item !== index;
      });
      return removedCorrect.map((item) => {
        if (item < index) return item;
        else return item - 1;
      });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //create answer object
    const answerObject = {};
    answers.forEach((answer, index) => {
      if (answer.trim()) {
        answerObject[index] = {
          answer,
          votes: 0,
          isCorrect: correctAnswers.includes(index),
        };
      }
    });
    //set database with current poll data
    const path = `data/sessions/${sessionId}/pollData`;
    set(ref(database, path), {
      answers: answerObject,
      question,
      reveal: false,
      votesCast: { votes: 0 },
    })
      .then(() => {
        setIsQuestion(true); // switches tutor's view to poll admin
        setAnswers(() => {
          return [];
        });
        navigate(`/tutor/${sessionId}/admin`);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="content__wrapper">
      <p>Creator</p>
      {user ? (
        <>
          <p>Create List</p>
          <div className="contentBox">
            <h3 className="heading">Create List</h3>
            <form className="pollForm" onSubmit={handleSubmit}>
              <div className="inputLine question">
                <label className="input" htmlFor="title">
                  Title
                </label>
                <input
                  className="input"
                  tabIndex="1"
                  onChange={titleChange}
                  type="text"
                  id="title"
                  value={title}
                />
              </div>
              {fields.map((_, index) => {
                return (
                  <div className="inputLine" key={index}>
                    <label className="input" htmlFor={`fields${index + 1}`}>
                      Field {index + 1}
                    </label>

                    <input
                      className="input"
                      onKeyDown={(e) => {
                        if (e.key === "Tab" && index === fields.length - 1) {
                          addField();
                        }
                      }}
                      onChange={(e) => {
                        fieldChange(e, index);
                      }}
                      type="text"
                      id={`fields${index + 1}`}
                      value={fields[index][0]}
                      tabIndex={index + 2}
                    ></input>
                    <select
                      onChange={(e) => {
                        changeDataType(e, index);
                      }}
                      value={fields[index][1]}
                    >
                      <option>abc</option>
                      <option>123</option>
                      <option>£</option>
                      <option>Y/N</option>
                    </select>
                    <button
                      onClick={() => {
                        removeAnswer(index);
                      }}
                      type="button"
                    >
                      X
                    </button>
                  </div>
                );
              })}
              <div className="inputLine">
                <span></span>
                <button
                  onClick={() => {
                    addField();
                  }}
                  type="button"
                >
                  Add answer
                </button>
              </div>
              <div className="inputLine">
                <span></span>
                <button>Submit</button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <p>You ain't logged in!</p>
      )}
    </div>
  );
};

export default Create;
