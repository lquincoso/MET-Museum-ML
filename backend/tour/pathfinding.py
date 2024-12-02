import heapq
import math

def astar(graph, start, end):
    open_set = []
    heapq.heappush(open_set, (0, start))
    came_from = {}
    g_score = {node: float('inf') for node in graph}
    g_score[start] = 0
    f_score = {node: float('inf') for node in graph}
    f_score[start] = heuristic(graph[start], graph[end])

    while open_set:
        current = heapq.heappop(open_set)[1]

        if current == end:
            return reconstruct_path(came_from, current)

        for neighbor in graph[current]['neighbors']:
            tentative_g_score = g_score[current] + graph[current]['neighbors'][neighbor]

            if tentative_g_score < g_score[neighbor]:
                came_from[neighbor] = current
                g_score[neighbor] = tentative_g_score
                f_score[neighbor] = tentative_g_score + heuristic(graph[neighbor], graph[end])
                heapq.heappush(open_set, (f_score[neighbor], neighbor))

    return []

def heuristic(node1, node2):
    x1, y1 = node1['coordinates']
    x2, y2 = node2['coordinates']
    # Euclidean distance function used as heuristic
    return math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)

def reconstruct_path(came_from, current):
    path = [current]
    while current in came_from:
        current = came_from[current]
        path.append(current)
    path.reverse()
    return path
