$(document).ready(function () {
	$('.follow-twitter').popover({
		content: 'In development...',
		title: 'Tweets',
		placement: 'bottom'
	});

	$('html').delegate('.location', 'hover', function (event) {
		if (event.type === "mouseenter") {
			var container = $(this);
			var mapContainer = [
				'<div id="map" data-lat=',
				container.data('lat'),
				' data-long=',
				container.data('long'),
				'></div>'
			].join('');

			container.popover({
				html: true,
				content: mapContainer,
				title: container.data('map-title'),
				placement: 'bottom'
			});
			container.popover('show');
		}
	});

	$('html').delegate('.popover', 'DOMNodeInserted', function (event) {
		var container = $(this);
		if (container.find('.leaflet-container').length === 0) {
			var mapContainer = $('#map');
			var mapLat = parseFloat(mapContainer.data('lat'));
			var mapLong = parseFloat(mapContainer.data('long'));
			var map = L.map(
				'map',
				{
					dragging: false,
					touchZoom: false,
					scrollWheelZoom: false,
					doubleClickZoom: false,
					boxZoom: false,
					trackResize: false,
					worldCopyJump: false,
					zoomControl: false,
					attributionControl: false,
				}
			);
			map.setView([mapLat, mapLong], 10);
			L.tileLayer('http://{s}.tile.cloudmade.com/531cdd7137d247de8a2f7a635f2a869c/997/256/{z}/{x}/{y}.png', {
			}).addTo(map);
			L.marker([mapLat, mapLong]).addTo(map);
		}
	});
});
