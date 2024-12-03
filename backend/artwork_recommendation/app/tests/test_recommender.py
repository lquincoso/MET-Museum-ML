import pytest
from unittest.mock import AsyncMock, patch, MagicMock
from aiohttp import ClientSession, ClientResponseError
from PIL import Image
import io

from backend.artwork_recommendation.app.recommender import fetch_image

@pytest.mark.asyncio
@patch('aiohttp.ClientSession.get')
async def test_fetch_image_success(mock_get):
    # Testing a successful response with an image
    img = Image.new('RGB', (10, 10), color='red')
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='PNG')
    img_data = img_byte_arr.getvalue()

    mock_response = MagicMock()
    mock_response.__aenter__.return_value.status = 200
    mock_response.__aenter__.return_value.read = AsyncMock(return_value=img_data)
    mock_get.return_value = mock_response

    async with ClientSession() as session:
        url = 'https://fakeurl.com/fakeimage.png'
        result = await fetch_image(session, url)
        assert result is not None
        assert isinstance(result, Image.Image)
        assert result.mode == 'RGB'

@pytest.mark.asyncio
@patch('aiohttp.ClientSession.get')
async def test_fetch_image_not_found(mock_get):
    # Testing a 404 Not Found response
    mock_response = AsyncMock()
    mock_response.status = 404
    mock_response.read.return_value = None
    mock_get.return_value = mock_response

    async with ClientSession() as session:
        url = 'https://fakeurl.com/notfound.png'
        result = await fetch_image(session, url)
        assert result is None

@pytest.mark.asyncio
@patch('aiohttp.ClientSession.get')
async def test_fetch_image_timeout(mock_get):
    # Testing a timeout during image fetching
    mock_get.side_effect = Exception('Timeout occurred')

    async with ClientSession() as session:
        url = 'https://fakeurl.com/timeout.png'
        result = await fetch_image(session, url)
        assert result is None

@pytest.mark.asyncio
@patch('aiohttp.ClientSession.get')
async def test_fetch_image_invalid_data(mock_get):
    # Testing a successful response but with invalid image data
    mock_response = AsyncMock()
    mock_response.status = 200
    mock_response.read.return_value = b'not_an_image'
    mock_get.return_value = mock_response

    async with ClientSession() as session:
        url = 'https://fakeurl.com/invalidimage.png'
        result = await fetch_image(session, url)
        assert result is None
