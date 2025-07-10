import { expect, test, describe, vi } from 'vitest'
import { defaultGetCaniuseFn } from '../config/defaultFunctions'

// Mock fetch for testing
global.fetch = vi.fn()

describe('defaultGetCaniuseFn', () => {
    test('should handle successful response', async () => {
        const mockResponse = {
            title: 'CSS Flexible Box Layout Module',
            description: 'Method of positioning elements in horizontal or vertical stacks.',
            stats: {
                chrome: {
                    '89': 'y',
                    '90': 'y'
                },
                firefox: {
                    '84': 'y',
                    '85': 'y'
                }
            }
        }

        vi.mocked(fetch).mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        } as Response)

        const result = await defaultGetCaniuseFn('flexbox')
        
        expect(result).toEqual({
            title: 'CSS Flexible Box Layout Module',
            description: 'Method of positioning elements in horizontal or vertical stacks.',
            stats: {
                chrome: {
                    '89': 'y',
                    '90': 'y'
                },
                firefox: {
                    '84': 'y',
                    '85': 'y'
                }
            },
            status: 'ok'
        })
    })

    test('should handle 404 response', async () => {
        vi.mocked(fetch).mockResolvedValueOnce({
            ok: false,
            status: 404,
            headers: new Headers(),
        } as Response)

        const result = await defaultGetCaniuseFn('non-existent-feature')
        
        expect(result).toEqual({
            status: '404'
        })
    })

    test('should handle network error', async () => {
        vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'))

        const result = await defaultGetCaniuseFn('flexbox')
        
        expect(result).toEqual({
            status: 'other-error'
        })
    })
})