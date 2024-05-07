// reactstrap components
import ChatBox from "react-chat-plugin";
import React, { useState, useEffect } from "react";
import { Card, CardBody, Container } from "reactstrap";
import Header from "components/Headers/Header.js";
import "./styles/discussion.css";
import { db } from "../../Firebase";
import { collection, query, onSnapshot, addDoc } from "firebase/firestore";
import { startListener } from "../../util/remoteEventPublisher";

const Discussion = () => {
  const [position, setPosition] = useState({ latitude: null, longitude: null });
  const [attr, setAttr] = useState({
    showChatbox: false,
    showIcon: true,
    messages: [],
  });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async function (pos) {
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });

        if (
          localStorage.getItem("sos") !== undefined &&
          localStorage.getItem("sos") === "clicked"
        ) {
          setAttr({
            messages: attr.messages.concat({
              author: {
                username: "You",
                id: 1,
                avatarUrl: "https://i.imgur.com/V3KudV0.png",
              },
              text: (
                <p>
                  <p>
                    <p>Hi all,</p>
                    <p>
                      I am in a <strong>Emergency</strong> situation
                    </p>
                    <p>
                      Could you please help me to get resolve this situation. My
                      location is attached with following button
                    </p>
                  </p>
                </p>
              ),
              buttons: [
                {
                  type: "URL",
                  title: "Location",
                  payload: `http://maps.google.com/maps?q=${pos.coords.latitude},${pos.coords.longitude}`,
                },
              ],
              type: "text",
              timestamp: +new Date(),
            }),
          });

          localStorage.setItem("SOS_DATA", JSON.stringify({
            author_id: 1,
            text: `Hi all,\nI am in a #Emergency situation\nCould you please help me to get resolve this situation.\nMy location is attached with following button\n`,
            location: `${pos.coords.latitude},${pos.coords.longitude}`,
            type: "text",
            timestamp: +new Date(),
          }))

          startListener();

          await addDoc(collection(db, "discussions"), {
            author_id: 1,
            text: `Hi all,\nI am in a #Emergency situation\nCould you please help me to get resolve this situation.\nMy location is attached with following button\n`,
            location: `${pos.coords.latitude},${pos.coords.longitude}`,
            type: "text",
            timestamp: +new Date(),
          });

          localStorage.removeItem("sos");
        }
      });
    } else {
      alert("Geolocation is not available in your browser.");
    }

    fetchData();
  }, []);

  const fetchData = () => {
    const q = query(collection(db, "discussions"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let discussions = [];
      querySnapshot.forEach((doc) => {
        discussions.push({
          author: {
            username: doc.data().author_id === 1 ? "You" : "Others",
            id: doc.data().author_id,
            avatarUrl: "https://i.imgur.com/V3KudV0.png",
          },
          text: doc.data().text,
          buttons: [
            {
              type: "URL",
              title: "Location",
              payload: `http://maps.google.com/maps?q=${doc.data().location}`,
            },
          ],
          type: "text",
          timestamp: doc.data().timestamp,
        });
      });
      discussions.sort((a, b) => a.timestamp - b.timestamp);
      setAttr({
        messages: discussions,
      });
    });

    return () => unsub();
  };

  const handleOnSendMessage = async (message) => {
    if (message !== "" && message !== null && message !== undefined) {
      if (window.confirm("Do you want to sent this message?")) {
        setAttr({
          messages: attr.messages.concat({
            author: {
              username: "You",
              id: 1,
              avatarUrl: "https://i.imgur.com/V3KudV0.png",
            },
            text: (
              <p>
                <p>{message}</p>
              </p>
            ),
            buttons: [
              {
                type: "URL",
                title: "Location",
                payload: `http://maps.google.com/maps?q=${position.latitude},${position.longitude}`,
              },
            ],
            type: "text",
            timestamp: +new Date(),
          }),
        });

        await addDoc(collection(db, "discussions"), {
          author_id: 1,
          text: message,
          location: `${position.latitude},${position.longitude}`,
          type: "text",
          timestamp: +new Date(),
        });
      }
    } else {
      alert("Please enter valid message!");
    }
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7 " fluid>
        <Card className="shadow">
          <CardBody>
            <ChatBox
              onSendMessage={handleOnSendMessage}
              userId={1}
              messages={attr.messages}
              width={"100vw"}
              showTypingIndicator={true}
            />
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default Discussion;
