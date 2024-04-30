// reactstrap components
import ChatBox from "react-chat-plugin";
import React, { useState, useEffect } from "react";
import { Card, CardBody, Container } from "reactstrap";
import Header from "components/Headers/Header.js";
import "./styles/discussion.css";

const Discussion = () => {
  const [position, setPosition] = useState({ latitude: null, longitude: null });
  const [attr, setAttr] = useState({
    showChatbox: false,
    showIcon: true,
    messages: []
  });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (pos) {
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });

        if (localStorage.getItem('sos') !== undefined && localStorage.getItem('sos') === 'clicked') {
          setAttr({
            messages: attr.messages.concat({
              author: {
                username: "You",
                id: 1,
                avatarUrl: "https://i.imgur.com/V3KudV0.png",
              },
              text: (
                <p>
                  <p ><p>Hi all,</p>
                    <p>I am in a <strong>Emergency</strong> situation</p>
                    <p>Could you please help me to get resolve this situation. My location is attached with folowing button</p>
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
          localStorage.removeItem('sos')
        }
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, [attr]);



  const handleOnSendMessage = (message) => {
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
