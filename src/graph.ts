export const graph = JSON.stringify({
	"nodes": [
			{
					"width": 327,
					"height": 371,
					"id": "00000000-0000-0000-0000-00000000abba",
					"type": "customNode",
					"data": {
							"title": "כותרת",
							"options": {}
					},
					"position": {
							"x": 900.0000000000001,
							"y": 44.00000000000003
					},
					"targetPosition": "left",
					"selected": false,
					"positionAbsolute": {
							"x": 900.0000000000001,
							"y": 44.00000000000003
					},
					"dragging": false,
					"style": {
							"backgroundColor": "transparent"
					}
			},
			{
					"width": 327,
					"height": 257,
					"id": "c5dddf2c-81d6-478b-bae8-276e33ff08f0",
					"type": "customNode",
					"position": {
							"x": 395,
							"y": -106
					},
					"data": {
							"title": "כותרת",
							"messageContent": "2123"
					},
					"targetPosition": "right",
					"selected": true,
					"positionAbsolute": {
							"x": 395,
							"y": -106
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
					"sourceHandle": "987d7dad-7ece-4eaa-aff3-a4ac3b23bcb4",
					"target": "c5dddf2c-81d6-478b-bae8-276e33ff08f0",
					"targetHandle": "c5dddf2c-81d6-478b-bae8-276e33ff08f0-input",
					"id": "987d7dad-7ece-4eaa-aff3-a4ac3b23bcb4_c5dddf2c-81d6-478b-bae8-276e33ff08f0-input",
					"style": {
							"stroke": "#9AD4F1"
					},
					"type": "customEdge",
					"markerEnd": {
							"type": "arrow",
							"strokeWidth": 2,
							"color": "#9AD4F1"
					}
			}
	]
})