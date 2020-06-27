(define (domain smart-and-healthy-office)

(:requirements :strips :typing :negative-preconditions :action-costs :equality)

(:types room user)

(:predicates
    (is_currently_at ?u - user ?r - room)
    (is_next_at ?u - user ?r - room)
    (extra_cost_change_room_cool_down ?u - user)
)

(:functions (total-cost)
            (stress ?r - room)
            (stress_plus_changing_room ?r - room)
            (change_room_cool_down ?u - user)
)

(:action not_change_room
    :parameters (?u - user ?r - room)
    :precondition (is_currently_at ?u ?r)
    :effect (and (is_next_at ?u ?r)
                 (not (is_currently_at ?u ?r))
                 (increase (total-cost) (stress ?r)))
)

(:action change_room
    :parameters (?u - user ?r1 - room ?r2 - room)
    :precondition (and (is_currently_at ?u ?r1) (not (= ?r1 ?r2)))
    :effect (and (is_next_at ?u ?r2)
                 (not (is_currently_at ?u ?r1))
                 (extra_cost_change_room_cool_down ?u)
                 (increase (total-cost) (stress_plus_changing_room ?r2)))
)

(:action add_extra_cost_change_room_cool_down
    :parameters (?u - user)
    :precondition (extra_cost_change_room_cool_down ?u)
    :effect (and (not (extra_cost_change_room_cool_down ?u))
                     (increase (total-cost) (change_room_cool_down ?u)))
)
)
