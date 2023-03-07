export const graph = JSON.stringify(
	{
    "nodes": [
        {
            "width": 300,
            "height": 527,
            "id": "00000000-0000-0000-0000-00000000abba",
            "type": "customNode",
            "data": {
                "title": "הודעת כניסה בוט שירות לקוחות",
                "messageContent": "שלום! אני הבוט החכם של מחלקת התמיכה. באיזה נושא אתם זקוקים לתמיכה?",
                "options": [
                    {
                        "portId": "6e18ff7d-3527-4340-b470-14198e64c0d8",
                        "data": "הזמנת חבילות"
                    },
                    {
                        "portId": "96e7c56b-9c59-41fd-977e-d03b374107ff",
                        "data": "טלפון קווי"
                    },
                    {
                        "portId": "686910c7-9e3e-4b10-956e-3933e5a0f6f2",
                        "data": "מרכזייה"
                    },
                    {
                        "portId": "45f378e0-24b7-418d-91a2-24254cb9ee2c",
                        "data": "התקנה גיבוי והפעלת מרכזייה אלחוטית דרך ראוטר"
                    },
                    {
                        "portId": "597205d4-e9fe-4d4a-99d0-147cfeb5254e",
                        "data": ""
                    }
                ]
            },
            "position": {
                "x": 755.1390158215456,
                "y": -111.50721579691862
            },
            "targetPosition": "left",
            "selected": false,
            "dragging": false,
            "positionAbsolute": {
                "x": 755.1390158215456,
                "y": -111.50721579691862
            },
            "style": {
                "backgroundColor": "transparent"
            }
        },
        {
            "width": 300,
            "height": 258,
            "id": "b645f5a7-24c8-46c0-b6cb-0f6f2b634d6d",
            "type": "customNode",
            "position": {
                "x": 28.346769704909207,
                "y": -324.3125146120139
            },
            "data": {
                "title": "כותרת",
                "messageContent": "שלום! אני הבוט החכם של מחלקת התמיכה. באיזה נושא אתם זקוקים לתמיכה?"
            },
            "targetPosition": "right",
            "selected": false,
            "positionAbsolute": {
                "x": 28.346769704909207,
                "y": -324.3125146120139
            },
            "dragging": false,
            "style": {
                "backgroundColor": "transparent"
            }
        },
        {
            "width": 300,
            "height": 457,
            "id": "80005ede-a55e-439c-b2cc-a5b62ee22a77",
            "type": "customNode",
            "position": {
                "x": 32.8319222542485,
                "y": -24.966854792349935
            },
            "data": {
                "title": "כותרת",
                "messageContent": "שלום! אני הבוט החכם של מחלקת התמיכה. באיזה נושא אתם זקוקים לתמיכה?",
                "options": [
                    {
                        "portId": "b8622038-0593-4eaf-b08f-a5352935a88f",
                        "data": "הזמנת חבילות"
                    },
                    {
                        "portId": "a5169d0c-f907-40e3-bf98-8c10945f45a2",
                        "data": "אין אינטרנט"
                    },
                    {
                        "portId": "13a3df78-0c22-46e3-850d-f45fb4c2b305",
                        "data": "אינטרנט איטי"
                    },
                    {
                        "portId": "b6c71ee6-bbc5-4ff5-b01c-73f07fdac1e4",
                        "data": "שדרוג"
                    }
                ]
            },
            "targetPosition": "right",
            "selected": false,
            "positionAbsolute": {
                "x": 32.8319222542485,
                "y": -24.966854792349935
            },
            "dragging": false,
            "style": {
                "backgroundColor": "transparent"
            }
        },
        {
            "width": 300,
            "height": 258,
            "id": "4faacb60-f687-4697-96a8-d4336fe4bb51",
            "type": "customNode",
            "position": {
                "x": 43.614559548284035,
                "y": 476.0026568541801
            },
            "data": {
                "title": "כותרת",
                "messageContent": "אנא פנה אלינו בטלפון 054-233312351"
            },
            "targetPosition": "right",
            "selected": false,
            "positionAbsolute": {
                "x": 43.614559548284035,
                "y": 476.0026568541801
            },
            "dragging": false,
            "style": {
                "backgroundColor": "transparent"
            }
        }
    ],
    "edges": [
        {
            "source": "00000000-0000-0000-0000-00000000abba",
            "sourceHandle": "6e18ff7d-3527-4340-b470-14198e64c0d8",
            "target": "b645f5a7-24c8-46c0-b6cb-0f6f2b634d6d",
            "targetHandle": "b645f5a7-24c8-46c0-b6cb-0f6f2b634d6d-input",
            "id": "6e18ff7d-3527-4340-b470-14198e64c0d8_b645f5a7-24c8-46c0-b6cb-0f6f2b634d6d-input",
            "style": {
                "stroke": "#9AD4F1",
                "strokeWidth": 4
            },
            "type": "customEdge",
            "markerEnd": {
                "type": "arrow",
                "strokeWidth": 1.2,
                "color": "#9AD4F1"
            },
            "data": {
                "expanded": false
            }
        },
        {
            "source": "00000000-0000-0000-0000-00000000abba",
            "sourceHandle": "686910c7-9e3e-4b10-956e-3933e5a0f6f2",
            "target": "b645f5a7-24c8-46c0-b6cb-0f6f2b634d6d",
            "targetHandle": "b645f5a7-24c8-46c0-b6cb-0f6f2b634d6d-input",
            "id": "686910c7-9e3e-4b10-956e-3933e5a0f6f2_b645f5a7-24c8-46c0-b6cb-0f6f2b634d6d-input",
            "style": {
                "stroke": "#9AD4F1",
                "strokeWidth": 4
            },
            "type": "customEdge",
            "markerEnd": {
                "type": "arrow",
                "strokeWidth": 1.2,
                "color": "#9AD4F1"
            },
            "data": {
                "expanded": false
            }
        },
        {
            "source": "00000000-0000-0000-0000-00000000abba",
            "sourceHandle": "45f378e0-24b7-418d-91a2-24254cb9ee2c",
            "target": "80005ede-a55e-439c-b2cc-a5b62ee22a77",
            "targetHandle": "80005ede-a55e-439c-b2cc-a5b62ee22a77-input",
            "id": "45f378e0-24b7-418d-91a2-24254cb9ee2c_80005ede-a55e-439c-b2cc-a5b62ee22a77-input",
            "style": {
                "stroke": "#9AD4F1",
                "strokeWidth": 4
            },
            "type": "customEdge",
            "markerEnd": {
                "type": "arrow",
                "strokeWidth": 1.2,
                "color": "#9AD4F1"
            },
            "data": {
                "expanded": false
            }
        }
    ]
}
)