import googlemaps
from typing import Dict, Any

class GoogleMapsService:
    def __init__(self, api_key: str):
        self.client = googlemaps.Client(key=api_key)

    def geocode_address(self, address: str) -> Dict[str, Any]:
        """Get coordinates for an address."""
        result = self.client.geocode(address)
        if result:
            location = result[0]['geometry']['location']
            return {'lat': location['lat'], 'lng': location['lng']}
        return {}

    def find_polling_places(self, address: str) -> list:
        """Find nearby polling places (simplified)."""
        # In reality, use election-specific APIs, but for demo, use places API
        geocode_result = self.geocode_address(address)
        if geocode_result:
            places_result = self.client.places_nearby(
                location=geocode_result,
                keyword='polling place',
                radius=5000
            )
            return places_result.get('results', [])
        return []